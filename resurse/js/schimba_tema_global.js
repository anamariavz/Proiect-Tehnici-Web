window.addEventListener("load", function() {
    const switchTema = document.getElementById("switch-tema");
    const iconTema = document.getElementById("icon-tema");

    if (!switchTema || !iconTema) return;

    function setIcon() {
        if (document.body.classList.contains("dark")) {
            iconTema.classList.remove("bi-sun");
            iconTema.classList.add("bi-moon");
            switchTema.checked = true;
        } else {
            iconTema.classList.remove("bi-moon");
            iconTema.classList.add("bi-sun");
            switchTema.checked = false;
        }
    }

    if (localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
    setIcon();

    switchTema.addEventListener("change", function() {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("tema", "dark");
        } else {
            localStorage.removeItem("tema");
        }
        setIcon();
    });
});