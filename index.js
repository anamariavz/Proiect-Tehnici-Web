// importam pachetele necesare pentru: 
const express= require("express");      //framework server web
const path= require("path");            //lucrul cu caile de fisiere
const fs = require("fs");               //          sistemul de fisiere 
const sharp = require("sharp");         //a procesa imaginile 
const sass = require("sass");           //a compila SCSS in CSS
const pg = require("pg");               //a ne conecta si a interactiona cu PostgreSQL

//se extrage clientul din modulul pg
const Client=pg.Client;

//se creaza un nou client pt BD
client=new Client({
    database:"clinica_happy_dent",
    user:"anamaria",
    password:"HappyDent2025",
    host:"localhost",
    port:5432
})


client.connect() // conectarea la BD

client.query("select * from servicii", function(err, rezultat ){
    console.log(err)    
    console.log(rezultat)
})

//afisarea rezultatelor din interogarea enum complexitate
client.query("select * from unnest(enum_range(null::complexitate))", function(err, rezultat ){
    console.log(err)    
    console.log(rezultat)
})


app= express(); // initiaza Express

//afisarea cailor de lucru in consola
console.log("Folderul proiectului: ", __dirname)
console.log("Calea fisierului index.js: ", __filename)
console.log("Folderul curent de lucru: ", process.cwd())


app.set("view engine", "ejs"); // ejs permite incorporarea de cod js in fisiere HTML
// view engine  ----> Express va utiliza motorul ejs pentru a procesa si returna cererile de vizualizari ca HTML

obGlobal={
    obErori:null,
    obImagini:null,
    folderScss: path.join(__dirname,"resurse/scss"),
    folderCss: path.join(__dirname,"resurse/css"),
    folderBackup: path.join(__dirname, "backup")
}

// se creeaza folderele specificate daca nu exista 
vect_foldere = ["temp", "backup", "temp1"]
for (let folder of vect_foldere){
    let caleFolder = path.join(__dirname, folder) 
    if (! fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder)
    }
}

// initializarea obiectului cu erori din fiserul JSON
function initErori(){
    let continut = fs.readFileSync(path.join(__dirname,"resurse/json/erori.json")).toString("utf-8");
    console.log(continut)
    obGlobal.obErori=JSON.parse(continut)
    console.log(obGlobal.obErori)
    
    //actualizam calea imaginilor 
    obGlobal.obErori.eroare_default.imagine=path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine)
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine=path.join(obGlobal.obErori.cale_baza, eroare.imagine)
    }
    console.log(obGlobal.obErori)

}

initErori()

// initializarea obiectului cu img pt galerie
function initImagini(){
    var continut= fs.readFileSync(path.join(__dirname,"resurse/json/galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;

    // se creaza folderul pentru img de dim medie daca nu exista
    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mediu");
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);

    //generam imaginile medii si setam caile pentru fiecare
    for (let imag of vImagini){
        [numeFis, ext]=imag.fisier.split(".");
        let caleFisAbs=path.join(caleAbs,imag.fisier);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
        imag.fisier_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu",numeFis+".webp" )
        imag.fisier=path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier )
        
    }
    console.log(obGlobal.obImagini)
}
initImagini();

// afiseaza o pagina de eroare personalizata 
function afisareEroare(res, identificator, titlu, text, imagine){
    let eroare= obGlobal.obErori.info_erori.find(function(elem){ 
                        return elem.identificator==identificator
                    });
    if(eroare){
        if(eroare.status)
            res.status(identificator)
        var titluCustom=titlu || eroare.titlu;  // se va afisa titlul, daca acesta exista sau eroarea aferenta
        var textCustom=text || eroare.text;
        var imagineCustom=imagine || eroare.imagine;


    }
    else{
        var err=obGlobal.obErori.eroare_default
        var titluCustom=titlu || err.titlu;
        var textCustom=text || err.text;
        var imagineCustom=imagine || err.imagine;


    }
    res.render("pagini/eroare", { //transmit obiectul locals
        titlu: titluCustom,
        text: textCustom,
        imagine: imagineCustom
})

}

//compilarea fisierelor scss in css si backup
function compileazaScss(caleScss, caleCss){
    console.log("cale:", caleCss);
    if (!caleCss) { 
        let numeFisExt = path.basename(caleScss);
        let numeFis = numeFisExt.split(".")[0];
        caleCss = numeFis + ".css";
    }

    if (!path.isAbsolute(caleScss))
        caleScss = path.join(obGlobal.folderScss, caleScss);
    if (!path.isAbsolute(caleCss))
        caleCss = path.join(obGlobal.folderCss, caleCss);

    let caleBackup = path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup)) {
        fs.mkdirSync(caleBackup, { recursive: true });
    }

    // Backup doar dacă CSS-ul există 
    if (fs.existsSync(caleCss)) {
        let timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
        let numeBackup = `${path.basename(caleCss, '.css')}_${timestamp}.css`;
        try {
            fs.copyFileSync(caleCss, path.join(caleBackup, numeBackup));
            console.log(`Backup creat: ${numeBackup}`);
        } catch (err) {
            console.error("Eroare la copierea în backup:", err);
        }
    }

    try {
        let rez = sass.compile(caleScss, { "sourceMap": true });
        fs.writeFileSync(caleCss, rez.css);
        console.log(`Compilare SCSS reușită pentru: ${caleCss}`);
    } catch (err) {
        console.error("Eroare la compilare SCSS:", err);
    }
}

// compilarea fisierelor scss din foderul resurse/scss
//compileazaScss("a.scss");
vFisiere=fs.readdirSync(obGlobal.folderScss); //vFisiere vectorul de nume de fisiere
for( let numeFis of vFisiere ){
    if (path.extname(numeFis)==".scss"){
        compileazaScss(numeFis);
    }    
}

// monitorizarea modificarilor fisierelor scss
fs.watch(obGlobal.folderScss, function(eveniment, numeFis){
    console.log(eveniment, numeFis);
    if (eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss, numeFis);
        if (numeFis && path.extname(numeFis) === ".scss" && fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})


app.use((req, res, next) => {
    if (req.url.endsWith(".vtt")) { // verifica daca calea catre fiser se termina cu .vtt si daca da se executa 
        res.setHeader("Content-Type", "text/vtt"); // setaeza header-ul la text/vtt  -->spune browserului ca fiserul transmis este unul de subtitrari
    }
    next(); // trimite cererea mai departe
});


app.use("/resurse", express.static(path.join(__dirname,"resurse")))

app.use("/node_modules", express.static(path.join(__dirname,"node_modules")))

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "/resurse/imagini/favicon/favicon.ico"))
})

app.get(["/","/index","/home"], function(req, res){
    res.render("pagini/index", {ip: req.ip, imagini: obGlobal.obImagini.imagini});
})

app.get("/despre", function(req, res){
    res.render("pagini/despre");
})

// app.get("/galerie", (req, res) => {
//     res.render("pagini/galerie", {
//         imagini: obGlobal.obImagini.imagini // <-- aici era lipsa!
//     });
// });

app.get("/galerie", (req, res) => {
    const nrMax = 8;
    let toateImaginile = obGlobal.obImagini.imagini;
    let imaginiRandom = [...toateImaginile]
        .sort(() => 0.5 - Math.random())
        .slice(0, nrMax);

    res.render("pagini/galerie", {
        imagini: toateImaginile, // galeria completă (statică)
        imagini_animata: imaginiRandom // galeria animată
    });
});

app.get("/index/a", function(req, res){
    res.render("pagini/index");
})


app.get("/cerere", function(req, res){
    res.send("<p style='color:blue'>Buna ziua</p>")
})


app.get("/fisier", function(req, res, next){
    res.sendfile(path.join(__dirname,"package.json"));
})


app.get("/abc", function(req, res, next){
    res.write("Data curenta: ")
    next()
})

app.get("/abc", function(req, res, next){
    res.write((new Date())+"")
    res.end()
    next()
})


app.get("/abc", function(req, res, next){
    console.log("------------")
})

// afisarea serviciilor din BD 
app.get("/servicii", function(req, res){
    console.log(req.query)
    var conditieQuery=""; // TO DO where din parametri


    queryOptiuni="select * from unnest(enum_range(null::complexitate))"
    client.query(queryOptiuni, function(err, rezOptiuni){
        console.log(rezOptiuni)


        queryProduse="select * from servicii"
        client.query(queryProduse, function(err, rez){
            if (err){
                console.log(err);
                afisareEroare(res, 2);
            }
            else{
                res.render("pagini/servicii", {servicii: rez.rows, optiuni:rezOptiuni.rows})
            }
        })
    });
})

// blocarea accesului direct la resurse cu eroare 403 
app.get(/^\/resurse\/[a-zA-Z0-9_\/]*$/, function(req, res, next){
    afisareEroare(res,403);
})// expresi regulata care interzice accesul direct la cai care incep cu /resurse/ urmat de alte litere, cifre, _, - sau /

// blocarea accesului direct la fisisere .ejs
app.get("/*.ejs", function(req, res, next){
    afisareEroare(res,400);
})

// orice cerere get care nu a fost prinsa anterior va ajunge aici 
app.get("/*", function(req, res, next){
    try{
        res.render("pagini"+req.url,function (err, rezultatRandare){
            if (err){
                if(err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res,404);
                }
                else{
                    afisareEroare(res);
                }
            }
            else{
                console.log(rezultatRandare);
                res.send(rezultatRandare)
            }
        });
    }
    catch(errRandare){
        if(errRandare.message.startsWith("Cannot find module")){
            afisareEroare(res,404);
        }
        else{
            afisareEroare(res);
        }
    }
})



app.listen(8080);
console.log("Serverul a pornit")


