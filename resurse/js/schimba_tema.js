window.addEventListener("load", function() {
        if(localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark");
    }
        document.getElementById("schimba_tema").onclick = function() {
        if(document.body.classList.toggle("dark")){
            localStorage.setItem("tema", "dark");
        }
        else {
            localStorage.removeItem("tema");    
        }
    }
})