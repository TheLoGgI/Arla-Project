let ctx = document.getElementById('graf').getContext('2d');

let grath = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        backgroundColor: 'black',
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return '$' + value
                    },
                    max: 30,
                    min: 0
                },
                
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
    
                },
                gridLines: {
                    display:false
                }
                
            }],
            scaleLabel: {
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

function getData() {
    
}
