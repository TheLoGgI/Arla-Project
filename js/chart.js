let ctx = document.getElementById('graf').getContext('2d');
let chartData

(function() {
    fetch("../json/csvjson.json")
    .then(response => response.json())
    .then(data => chartData = data)  
})()

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2016', '2017', '2018', '2019', '2020'],
        datasets: [{
            label: 'Kg mælk per års ko',
            data: [7830.036, 8830.039 , 9927.232, 9075.765, 10185.449],
            backgroundColor: [
                'rgba(255, 99, 132, 0)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 5,
            lineTension: .5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    callback: function(value, index, values) {
                        return value + ' kg'
                    },
                    fontSize: 18,
                    fontFamily: 'Arla interface',
                    // max: 30,
                    // min: 0
                },
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontSize: 18,
                    fontFamily: 'Arla interface',
                },
                gridLines: {
                    display:false
                },
                

            }],
        },
        
        layout: {
            padding: {
                top: 50,
                bottom:50 ,
                right:50,
                left: 25
            }
        },
        legend: {
            display: true,
            position: 'top',
            align: 'center',
            labels: {
                fontColor: "black",
                fontSize: 25,
                padding: 0
            }
        },
        tooltips: {
            mode: 'point',
            titleAlign: 'left',
            titleFontFamily: 'Arla interface',
            bodyFontSize: 18,
            titleFontSize: 30,
            footerFontSize: 18,

        }
    }
});

function dataHandler(){
    const emner = document.querySelectorAll(".emne");
    // console.log(emner);
    for(const emne of emner){
        emne.addEventListener("click", e => {
            for (const chartSet of chartData) {
                // console.log(chartSet.label, e.currentTarget.textContent);
                if (e.currentTarget.textContent === chartSet.label) {
                    // console.log(chartSet.label === e.currentTarget.textContent);
                    replaceData(chart, chartSet)
                } 
            }
        } )
        
    }
}

dataHandler()

function replaceData(chart, data){
    chart.data.datasets[0].label = data.label
    chart.data.datasets[0].data = data.data
    chart.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
        return value + ` ${data.unit}`
    }

    chart.update()
}

