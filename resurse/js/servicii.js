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