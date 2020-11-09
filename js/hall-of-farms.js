
//Viser drop-down content til land
function dropDownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Lukker drop-down igen, hvis brugeren klikker udenfor boksen
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Viser drop-down content til region
function dropDownFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

// Lukker drop-down igen, hvis brugeren klikker udenfor boksen
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

