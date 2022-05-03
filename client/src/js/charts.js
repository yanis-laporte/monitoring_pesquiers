import { API_URL, $, $$ } from './base';

// function addData(data) {
//     for (var i = 0; i < data.length; i++) {
//         dataPoints.push({
//             x: new Date(data[i].date),
//             y: data[i].units
//         });
//     }
//     chart.render();

// }

// function drawChart(container_id) {
//     var chart = new CanvasJS.Chart(container_id)
// }


async function fetchNode(b_id) {
    return await fetch(`${API_URL}/nodes.php?id=${b_id}`)
        .then(res => res.json())
}

async function fetchValues(id) {
    await fetch(`${API_URL}/values.php?u=true&id=${id}`)
        .then(res => res.json())
        .then(data => a = data)
    return a
}

async function drawChart(data, units, container) {
    units = units[0]

    let dataPoints = [];
    let dataPointsY = data[0].map(e => parseInt(e.value));
    let dataPointsX = data[0].map(e => new Date(e.timestamp).getTime());
    dataPointsY.forEach((e, i) => {
        // Value, Timestamp
        dataPoints.push([dataPointsX[i], dataPointsY[i],])
    });

    Highcharts.chart(container, {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Titre'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Cliquer-glisser dans le zone de point pour agrandir' : 'Pincer le graphique pour zomer'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },

        series: [{
            type: 'line',
            name: `${units.name}, ${units.unit}`,
            data: dataPoints
        }]
    });

    //#region 
    // var chart = Highcharts.chart(container, {
    //     title: {
    //         text: `Évolution de la ${units.name} toute les 30 minutes`
    //     },

    //     yAxis: {
    //         title: {
    //             text: `Y axis`
    //         }
    //     },

    //     xAxis: {
    //         title: {
    //             text: 'Date de X à Y FAIRE L\'DU TEMPS'
    //         }
    //     },

    //     series: [{
    //         yAxis: 0,
    //         type: 'line',
    //         name: 'Température',
    //         data: dp
    //     }],

    // });


    // https://www.highcharts.com/forum/viewtopic.php?t=35142

    // var chart = Highcharts.chart(container, {

    //     time: {
    //         timezone: 'Europe/Paris'
    //     },

    //     lang: {
    //         viewFullscreen: 'Plein écran',
    //         printChart: 'Imprimer le graphique',
    //         downloadPNG: 'Télécharger en PNG',
    //         downloadJPEG: 'Télécharger en JPEG',
    //         downloadPDF: 'Télécharger en PDF',
    //         downloadSVG: 'Télécharger en SVG',
    //         downloadCSV: 'Exporter en CSV',
    //         downloadXLS: 'Exporter en XLS',
    //         viewData: 'Voir la table de données',
    //         contextButtonTitle: 'Menu contextuel'
    //     },

    //     navigation: {
    //         buttonOptions: {
    //             theme: {
    //                 // Good old text links
    //                 // todo
    //                 style: {
    //                     color: '#039',
    //                     textDecoration: 'underline'
    //                 }
    //             }
    //         }
    //     },

    //     exporting: {
    //         buttons: {
    //             contextButton: {
    //                 enabled: true
    //             },
    //             exportButton: {
    //                 text: 'Télécharger',
    //                 // Use only the download related menu items from the default
    //                 // context button
    //                 menuItems: [
    //                     'downloadPNG',
    //                     'downloadJPEG',
    //                     'separator',
    //                     'downloadCSV'
    //                 ]
    //             }
    //         }
    //     },

    //     title: {
    //         text: `Évolution de la ${units.name} toute les 30 minutes`
    //     },

    //     yAxis: {
    //         title: {
    //             text: `Y axis`
    //         }
    //     },

    //     xAxis: {
    //         title: {
    //             text: 'Date de X à Y FAIRE L\'DU TEMPS'
    //         }
    //     },

    //     plotOptions: {
    //         series: {
    //             label: {
    //                 connectorAllowed: false
    //             },
    //             pointStart: 2010
    //         }
    //     },

    //     legend: {
    //         align: 'left',
    //         verticalAlign: 'top',
    //         borderWidth: 0
    //     },

    //     series: [{
    //         // yAxis: 0,
    //         // type: 'line',
    //         // name: 'Température',
    //         data: {
    //             x: dataPoints,
    //             y: dataPointsX
    //         }
    //     }
    //     ],

    //     tooltip: {
    //         dateTimeLabelFormats: {
    //             hour: '%A, %b %e, %l %p'
    //         },
    //     },
    //     xAxis: {
    //         dateTimeLabelFormats: {
    //             hour: '%l %p'
    //         },
    //         type: 'datetime'
    //     },

    //     // caption: {
    //     //     text: 'Temperature'
    //     // },

    //     // chart: {
    //     // backgroundColor: 'gray'
    //     // https://api.highcharts.com/highcharts/chart
    //     // },



    //     // loading: {
    //     //     // https://api.highcharts.com/highcharts/loading
    //     // }

    //     // tooltip: {
    //     //     // https://api.highcharts.com/highcharts/tooltip
    //     // },

    //     // responsive: {
    //     // https://api.highcharts.com/highcharts/responsive
    //     //     rules: [{
    //     //         condition: {
    //     //             maxWidth: 500
    //     //         },
    //     //         chartOptions: {
    //     //             legend: {
    //     //                 layout: 'horizontal',
    //     //                 align: 'center',
    //     //                 verticalAlign: 'bottom'
    //     //             }
    //     //         }
    //     //     }]
    //     // }
    // });
    //#endregion
}

(async () => {
    // Getting balise id
    const b_id = window.location.search.split('?')[1].split('=')[1]
    console.log({ b_id });

    // Fetching balise (node) data
    const b_data = await fetchNode(b_id)
    console.log('b_data', b_data);

    // Getting sensors id
    const sensors_list = b_data.sensors_id.split(',')
    console.log('sensors_list', sensors_list);

    // Fetching sensors data
    var sensors_data = []
    var sensors_units = []


    console.time('fetchValues')
    const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    await asyncForEach(sensors_list, async (sensor_id) => {
        let s_data = await fetchValues(sensor_id)
        console.timeLog('fetchValues', 'fetched sensor data')
        sensors_units.push({ name: s_data[0].name, unit: s_data[0].unit, symb: s_data[0].symbol })
        sensors_data.push(s_data)
        // id, balise_id, sensor_id, value, timestamp
    });
    console.timeEnd('fetchValues')


    console.log(sensors_data);
    console.log(sensors_units);

    // Draw Charts
    drawChart(sensors_data, sensors_units, 'chartContainer')

    $('battery').innerHTML += b_data.battery_level + '%'
    $('name').innerHTML = b_data.name
})()