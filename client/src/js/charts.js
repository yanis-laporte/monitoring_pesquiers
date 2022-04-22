import { API_URL, $, $$ } from './base';

window.addEventListener('hashchange', async () => {
    ids = await fetchNode();
    ids.forEach(async (id) => {
        makeChart(await fetchValues(id))
    })
})

window.addEventListener('load', async () => {
    ids = await fetchNode();
    ids.forEach(async (id) => {
        makeChart(await fetchValues(id))
    })
})

async function fetchNode() {
    const id = window.location.hash.substring(1)
    var a;
    await fetch(`${API_URL}/nodes.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            data = data[0]
            console.log(data)
            $('battery').innerHTML += data.battery_level + '%'
            $('name').innerHTML = data.name
            a = data.sensors_id.split(',');
        })
    return a
}

async function fetchValues(id) {
    await fetch(`${API_URL}/values.php?u=true&id=${id}`)
        .then(res => res.json())
        .then(data => a = data)
    return a
}

function addData(data) {
    for (var i = 0; i < data.length; i++) {
        dataPoints.push({
            x: new Date(data[i].date),
            y: data[i].units
        });
    }
    chart.render();

}


function makeChart(values) {
    console.log(values);
    var dataPoints = []
    addData(values)

    // x: new Date(values.timestamp), y: value
    // { x: new Date(2017, 6, 28), y: 12.5 }
    // values.forEach((value) => {
    //     listval.push({ x: new Date(value.timestamp), y: value.value })
    // })
    // console.log({ listval });

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
            dataPoints: listval
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

    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({
                x: new Date(data[i].date),
                y: data[i].units
            });
        }
        chart.render();

    }

}