
window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Daily High Temperature at Different Beaches"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },
        axisY: {
            title: "Temperature (in °C)",
            suffix: " °C"
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true
        },
        data: [{
            name: "Myrtle Beach",
            type: "spline",
            yValueFormatString: "#0.## °C",
            showInLegend: true,
            dataPoints: [
                { x: new Date(2017, 6, 24), y: 31 },
                { x: new Date(2017, 6, 25), y: 31 },
                { x: new Date(2017, 6, 26), y: 29 },
                { x: new Date(2017, 6, 27), y: 29 },
                { x: new Date(2017, 6, 28), y: 31 },
                { x: new Date(2017, 6, 29), y: 30 },
                { x: new Date(2017, 6, 30), y: 29 }
            ]
        }]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

}