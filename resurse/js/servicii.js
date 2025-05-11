window.onload = function(){
    btn = document.getElementById("filtrare");
    btn.onclick = function(){
       let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()

       let servicii = document.getElementsByClassName("serviciu")
       for (let serv of servicii){
            serv.style.display = "none"
            let nume = serv.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()

            let cond1 = (nume.startsWith(inpNume))


            if(cond1){
                serv.style.display = "block";
                
            }
       }
    }  

}

window.addEventListener("load", function() {
    const imaginiBackground = [
        '/resurse/imagini/bg1.1.jpeg',
        '/resurse/imagini/bg2.2.jpeg',
        '/resurse/imagini/bg3.3.jpeg'
    ];
    let index = 0;

    setInterval(() => {
        index = (index + 1) % imaginiBackground.length;
        document.body.style.backgroundImage = `url('${imaginiBackground[index]}')`;
    }, 10000); // 60 secunde
});


