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

    if (emneNavn.textContent === "Vis emner") {
        emneNavn.textContent = "Skjul emner"

    }
    else {
        emneNavn.textContent = "Vis emner"

    }

}


//Small overviews - Small graphs

//array for power usage and production
// Array of objects colors
let _colorData = [{
    dataType: "Produceret strøm",
    amountOfPower: 248,
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)"
}, {
    dataType: "Købt strøm",
    amountOfPower: 348,
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)"
}];

// 2: prepare data for chart
function prepareData(data) {
    let dataType = [];
    let amountOfPower = [];
    let backgroundColors = [];
    let borderColors = [];

    for (const dataObject of data) {
        dataType.push(dataObject.dataType);
        amountOfPower.push(dataObject.amountOfPower);
        backgroundColors.push(dataObject.backgroundColor);
        borderColors.push(dataObject.borderColor);
    }

    return {
        dataType,
        amountOfPower,
        backgroundColors,
        borderColors
    };
}

// 3: create and append the chart
function appendChart(data) {
    // create a new chart
    let chart = new Chart(document.getElementById('power-graph'), {
        type: 'bar',
        data: {
            labels: data.dataType,
            datasets: [{
                label: 'Strømforbrug',
                data: data.amountOfPower,
                backgroundColor: data.backgroundColors,
                borderColor: data.borderColors,
                borderWidth: 1
            }]
        },
        // Options and configuration options goes here
        // Go to the docs to find more: https://www.chartjs.org/docs/latest/
        // Bar chart: https://www.chartjs.org/docs/latest/charts/bar.html 
        options: {
            backgroundColor: 'black',
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return ''
                        },
                        max: 30,
                        min: 0
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
}
let data = prepareData(_colorData);
appendChart(data);
