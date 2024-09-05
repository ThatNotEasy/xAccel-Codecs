function random_color() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function chartjs_doughnut_new(canvas_id, title, labels, data) {
    var ctx = document.getElementById(canvas_id).getContext("2d");
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#206bc4', 'lightgray'],
                fill: false
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            cutoutPercentage: 70,
            rotation: 0.5 * Math.PI,
            responsive: true
        },
        plugins: [{
            beforeDraw: function(chart, options) {
                var width = chart.chart.width;
                var height = chart.chart.height;
                var ctx = chart.chart.ctx;

                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";

                var text = parseInt(chart.data.datasets[0].data[0]) + '%';
                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                var textY = height * 0.75;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}
