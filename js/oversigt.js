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
    const emneBox = document.getElementById("emne-container")
    emneBox.classList.toggle("emne-hidden");
    console.log(this);

    if (emneNavn.textContent === "Vis emner") {
        emneNavn.textContent = "Skjul emner"

    }
    else {
        emneNavn.textContent = "Vis emner"

    }

}






    const chartElectical = new Chart(document.getElementById('power-graph'), {
        type: 'bar',
        data: {
            labels: ['Produceret strøm', 'Købt strøm'],
            datasets: [{
                label: 'Produceret kontra købt',
                data: [248, 348],
                backgroundColor: [
                    "rgba(97, 150, 97, 0.2)",
                    "rgba(0, 117, 149, 0.2)"
                ],
                borderColor: [
                    "rgba(97, 150, 97, 1)",
                    "rgba(0, 117, 149, 1)"
                ],
                borderWidth: 1
            }]
        },
        // Options and configuration options goes here
        // Go to the docs to find more: https://www.chartjs.org/docs/latest/
        // Bar chart: https://www.chartjs.org/docs/latest/charts/bar.html 
        options: {
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'black',
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return ''
                        },
                        // max: 30,
                        // min: 0
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,

                    },
                    gridLines: {
                        display: false
                    }
                }],
                scaleLabel: {
                    display: false,
                    fontSize: 16
                },
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    fontColor: "black",
                }
            }
        }
    });

    const chartFood = new Chart(document.getElementById('chartFood'), {
        type: 'pie',
        data: {
            labels: ['Produceret Foder', 'Købt Foder'],
            datasets: [{
                label: 'Produceret kontra Købt',
                data: [248, 348],
                backgroundColor: [
                    "rgba(97, 150, 97, 0.2)",
                    "rgba(0, 117, 149, 0.2)"
                ],
                borderColor: [
                    "rgba(97, 150, 97, 1)",
                    "rgba(0, 117, 149, 1)"
                ],
                borderWidth: 1
            }]
        },
        // Options and configuration options goes here
        // Go to the docs to find more: https://www.chartjs.org/docs/latest/
        // Bar chart: https://www.chartjs.org/docs/latest/charts/bar.html 
        options: {
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'black',
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return ''
                        },
                        // max: 30,
                        // min: 0
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        display: false,
                    },
                    gridLines: {
                        display: false
                    }
                }],
                scaleLabel: {
                    display: false,
                    fontSize: 16
                },
            },
            layout: {
                padding: 0
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    fontColor: "black",
                }
            }
        }
    });
function dataHandler(){
    const emner = document.querySelectorAll(".emne");
    console.log(emner);
    for(const emne of emner){
        emne.addEventListener("click", e=> {
            
            console.log(e.currentTarget.textContent)
            replaceData()
        } )
        
    }
}



dataHandler()

function getData(){
     
    fetch("../json/csvjson.json") 
        .then(response => response.json())
        .then(data=> console.log(data))  
        
        
    
    
}

function replaceData(chart, data){
    console.log(chart)
    //chart.data.datasets = data.data
    chart.data.labels = data.yearsLabel
  
    
}
replaceData(chartElectical, {})