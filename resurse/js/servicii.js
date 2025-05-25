window.onload = function(){
    btn = document.getElementById("filtrare");
    btn.onclick = function(){   
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()
        let vectRadio = document.getElementsByName("gr_anestezie")
        let inpPret = document.getElementById("inp-pret").value
        let inpPretMin = document.getElementById("inp-pret").min
        let inpComplexitate = document.getElementById("inp-complexitate").value.trim().toLowerCase()
        let commentBox = document.getElementById("commentBox").value.trim().toLowerCase()
    
        // verifică dacă toate filtrele sunt la valorile implicite
        let niciunFiltru = (
            inpNume === "" &&
            Array.from(vectRadio).some(r => r.checked && r.value === "toate") &&
            inpPret === inpPretMin &&
            inpComplexitate === "toate" &&
            commentBox === ""
        );

        if (niciunFiltru) {
            alert("Completează cel puțin un filtru pentru a efectua filtrarea!");
            return;
        }

       let inpAnestezie = null;
    //    let vectRadio = document.getElementsByName("gr_anestezie")
            for (let rad of vectRadio){
                if (rad.checked){
                    inpAnestezie = rad.value;
                    break;
                }
            }             
        
    //    let inpPret = document.getElementById("inp-pret").value

    //    let inpComplexitate = document.getElementById("inp-complexitate").value.trim().toLowerCase()

       let servicii = document.getElementsByClassName("serviciu")
       for (let serv of servicii){
            serv.style.display = "none"
            let nume = serv.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()

            let cond1 = (nume.startsWith(inpNume))

            let anestezie = serv.getElementsByClassName("val-anestezie")[0]?.innerText.trim().toLowerCase();
            let cond2 = (inpAnestezie == "toate" || inpAnestezie == anestezie);

            let pret = parseFloat(serv.getElementsByClassName("val-pret")[0]?.innerText.trim().toLowerCase());
            let cond3 = (inpPret < pret);

            let complexitate = serv.getElementsByClassName("val-complexitate")[0]?.innerText.trim().toLowerCase();
            let cond4 = (inpComplexitate == "toate" || inpComplexitate == complexitate);

            if(cond1 && cond2 && cond3 && cond4){
                serv.style.display = "block";
                
            }
       }
    }  

    document.getElementById("inp-pret").onchange = function() {
        document.getElementById("infoRange").innerHTML = `(${this.value})`;
    }

    document.getElementById("resetare").onclick = function() {
        if (confirm("Sigur vrei să resetezi filtrele?")) {
            document.getElementById("inp-nume").value = "";
            document.getElementById("i_rad3").checked = true;
            document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
            document.getElementById("infoRange").innerHTML = `(${document.getElementById("inp-pret").value})`;
            document.getElementById("inp-complexitate").value = "toate";
            document.getElementById("commentBox").value = "";
            let servicii = document.getElementsByClassName("serviciu")
            for (let serv of servicii){
                serv.style.display = "block";
            }
        }     
    }

    document.getElementById("sortCrescNume").onclick = function() {
           sorteaza(1);
        }

    document.getElementById("sortDescrescNume").onclick = function() {
           sorteaza(-1);
        }
    
    function sorteaza(semn) {
            let servicii = document.getElementsByClassName("serviciu");
            let vServicii = Array.from(servicii);
            vServicii.sort(function(a, b){
                let pretA = parseFloat(a.getElementsByClassName("val-pret")[0]?.innerText.trim().toLowerCase());
                let pretB = parseFloat(b.getElementsByClassName("val-pret")[0]?.innerText.trim().toLowerCase());
                if (pretA != pretB) 
                    return (pretA - pretB)*semn;
                // Daca preturile sunt egale, sortam dupa nume
                let numeA = a.getElementsByClassName("val-nume")[0].innerText.trim().toLowerCase();
                let numeB = b.getElementsByClassName("val-nume")[0].innerText.trim().toLowerCase();
                return semn*numeA.localeCompare(numeB);
            })

            for (let serv of vServicii){
                serv.parentNode.appendChild(serv);
            }
        }
    
    window.onkeydown = function(e) {
        if (e.key == "c" && e.altKey) {
            let servicii = document.getElementsByClassName("serviciu")
            let SumaPret = 0;
            for (let serv of servicii){
                if(serv.style.display != "none"){
                    let pret = parseFloat(serv.getElementsByClassName("val-pret")[0]?.innerText.trim().toLowerCase());
                    SumaPret += pret;
                }
            }
            if(!document.getElementById("suma_preturi")) {
                let pRezultat = document.createElement("p");
                pRezultat.innerHTML = SumaPret;
                pRezultat.id = "suma_preturi";
                let p = document.getElementById("p-suma")
                p.parentNode.insertBefore(pRezultat, p.nextElementSibling);
                setTimeout(function(){
                    let p1 = document.getElementById("suma_preturi");
                    if (p1) {
                        p1.remove();
                    }
                }, 2000) // sterge dupa 2 secunde
            }
        
        }

    }

    const input = document.getElementById("inp-nume");
    const listaSugestii = document.getElementById("lista-sugestii");

    input.addEventListener("input", () => {
        const text = input.value.trim().toLowerCase();
        listaSugestii.innerHTML = "";
        listaSugestii.style.display = "none";

        if (text.length < 1) return; // NU schimba această linie!

        const potriviri = sugestii.filter(s => s.toLowerCase().includes(text));

        if (potriviri.length > 0) {
            potriviri.forEach(s => {
                const li = document.createElement("li");
                li.textContent = s;
                li.addEventListener("click", () => {
                    input.value = s;
                    listaSugestii.innerHTML = "";
                    listaSugestii.style.display = "none";
                });
                listaSugestii.appendChild(li);
            });
            listaSugestii.style.display = "block";
        }
    });

}


window.addEventListener("load", function() {
    const imaginiBackgroundLight = [
        '/resurse/imagini/bg1.1.jpeg',
        '/resurse/imagini/bg2.2.jpeg',
        '/resurse/imagini/bg3.3.jpeg'
    ];
    const imaginiBackgroundDark = [
        '/resurse/imagini/bg1_dark.png',
        '/resurse/imagini/bg2_dark.png',
        '/resurse/imagini/bg3_dark.png'
    ];
    let index = 0;

    function setBackground() {
        let isDark = document.body.classList.contains("dark");
        let imagini = isDark ? imaginiBackgroundDark : imaginiBackgroundLight;
        document.body.style.backgroundImage = `url('${imagini[index]}')`;
    }
    setBackground();
    setInterval(() => {
        index = (index + 1) % imaginiBackgroundLight.length;
        setBackground();
    }, 10000); // 60 secunde

    document.getElementById("schimba_tema")?.addEventListener("click", function() {

    });

    document.getElementById("filtrare-cuvinte").onclick = function() {
    const val = document.getElementById("commentBox").value.trim();
    const plus = [];
    const minus = [];
    val.split(/\s+/).forEach(cuv => {
        if (cuv.startsWith("+") && cuv.length > 1)
            plus.push(cuv.substring(1).toLowerCase());
        else if (cuv.startsWith("-") && cuv.length > 1)
            minus.push(cuv.substring(1).toLowerCase());
    });

    let servicii = document.getElementsByClassName("serviciu");
    for (let serv of servicii) {
        let descriere = serv.querySelector(".descriere").innerText.toLowerCase();
        let arePlus = plus.length === 0 ? true : plus.some(cuv => descriere.includes(cuv));
        let areMinus = minus.some(cuv => descriere.includes(cuv));
        serv.style.display = (arePlus && !areMinus) ? "block" : "none";
        }
    }

});

  