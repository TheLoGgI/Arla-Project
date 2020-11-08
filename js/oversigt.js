var coll = document.getElementsByClassName("emne-collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function()  {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

function flipArrowDyr() {
   var arrow = document.getElementById("dyr-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}

function flipArrowMaelk() {
   var arrow = document.getElementById("maelk-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}
function flipArrowEnergi() {
   var arrow = document.getElementById("energi-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}
function flipArrowCo2() {
   var arrow = document.getElementById("co2-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}
function flipArrowFoder() {
   var arrow = document.getElementById("foder-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}
function flipArrowOeko() {
   var arrow = document.getElementById("oeko-arrow");
   arrow.classList.toggle("dyr-arrow-flip");
}
