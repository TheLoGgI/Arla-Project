let coll = document.getElementsByClassName("emne-collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

function flipArrowDyr() {
    const arrow = document.getElementById("dyr-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowMaelk() {
    const arrow = document.getElementById("maelk-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowEnergi() {
    const arrow = document.getElementById("energi-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowCo2() {
    const arrow = document.getElementById("co2-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowFoder() {
    const arrow = document.getElementById("foder-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowOeko() {
    const arrow = document.getElementById("oeko-arrow");
    arrow.classList.toggle("dyr-arrow-flip");
}


function skjulEmner() {
    const emneNavn = document.getElementById("emne-knap")
    const emneBox = document.querySelector(".graf-element1");
    emneBox.classList.toggle("emne-hidden");
    console.log(this);
   
    if (emneNavn.textContent === "Vis emner"){
        emneNavn.textContent = "Skjul emner"
        
    }
else {
     emneNavn.textContent = "Vis emner"
    
}

}
