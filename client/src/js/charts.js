import { API_URL, $, $$ } from './base';
import { Toast } from './toast';

async function fetchNode(id) {
    return await fetch(`${API_URL}/nodes.php?id=${id}`)
        .then(res => res.json())
}

async function fetchValues(id) {
    return await fetch(`${API_URL}/values.php?u=true&id=${id}`)
        .then(res => res.json())
}

async function drawChart(data, units, container) {
    console.time('Drawing chart in')
    console.debug('data:', data);
    console.debug('units:', units);
    console.debug('container:', container);

    let dataPoints = [];
    let dataPointsY = data.map(e => parseInt(e.value));
    let dataPointsX = data.map(e => new Date(e.timestamp).getTime());
    dataPointsY.forEach((e, i) => {
        // Value, Timestamp
        dataPoints.push([dataPointsX[i], dataPointsY[i],])
    });

    Highcharts.setOptions({
        lang: {
            loading: 'Chargement...',
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],

            rangeSelectorFrom: 'Du',
            rangeSelectorTo: 'Au',
            rangeSelectorZoom: 'Période',

            exportButtonTitle: 'Exporter',
            resetZoom: 'Réinitialiser le zoom',
            resetZoomTitle: 'Réinitialiser le zoom',

            viewFullscreen: 'Plein écran',
            printChart: 'Imprimer le graphique',
            downloadPNG: 'Télécharger en PNG',
            downloadJPEG: 'Télécharger en JPEG',
            downloadPDF: 'Télécharger en PDF',
            downloadSVG: 'Télécharger en SVG',
            downloadCSV: 'Exporter en CSV',
            downloadXLS: 'Exporter au format Excel',
            viewData: 'Voir la table de données',
            contextButtonTitle: 'Menu contextuel'
        },
    });

    Highcharts.chart(container, {
        // #region Chart options
        // rangeSelector: {
        //     enabled: true,
        //     inputEnabled: false,
        //     buttonPosition: {
        //         align: 'right'
        //     },
        //     labelStyle: {
        //         display: 'none'
        //     },
        //     buttons: [{
        //         type: 'month',
        //         count: 1,
        //         text: '1m'
        //     },
        //     {
        //         type: 'month',
        //         count: 3,
        //         text: '3m'
        //     },
        //     {
        //         type: 'month',
        //         count: 6,
        //         text: '6m'
        //     },
        //     {
        //         type: 'year',
        //         count: 1,
        //         text: '1y'
        //     },
        //     {
        //         type: 'year',
        //         count: 2,
        //         text: '2y'
        //     },
        //     {
        //         type: 'year',
        //         count: 5,
        //         text: '5y'
        //     },
        //     {
        //         type: 'all',
        //         text: 'All'
        //     },
        //     {
        //         type: 'all',
        //         text: 'Latest',
        //         events: {
        //             click: () => {

        //                 alert('in real app I scroll to latest results');

        //                 return false;

        //             }
        //         }
        //     }]
        // },
        // navigator: {
        //     enabled: true,
        // },
        // legend: {
        //     enabled: false,
        //     align: 'left',
        //     verticalAlign: 'top',
        //     borderWidth: 0
        // },
        // loading: {
        //     // https://api.highcharts.com/highcharts/loading
        // },

        // tooltip: {
        //     // https://api.highcharts.com/highcharts/tooltip
        // },
        // responsive: {
        //     // https://api.highcharts.com/highcharts/responsive
        //         rules: [{
        //             condition: {
        //                 maxWidth: 500
        //             },
        //             chartOptions: {
        //                 legend: {
        //                     layout: 'horizontal',
        //                     align: 'center',
        //                     verticalAlign: 'bottom'
        //                 }
        //             }
        //         }]
        //     }
        // });
        //#endregion

        navigation: {
            buttonOptions: {
                theme: {
                    // Good old text links
                    // todo
                    style: {
                        color: '#039',
                        // textDecoration: 'underline'
                    }
                }
            }
        },

        exporting: {
            buttons: {
                contextButton: {
                    enabled: true,
                    menuItems: ["downloadPNG", "downloadJPEG", "downloadXLS", "separator", "printChart", "viewFullscreen"]
                },
                exportButton: {
                    text: 'Télécharger',
                    // Use only the download related menu items from the default
                    // context button
                    menuItems: [
                        'downloadPNG',
                        'downloadJPEG',
                        'separator',
                        'downloadXLS'
                    ]
                }
            }
        },

        chart: {
            zoomType: 'x',
            borderRadius: 5,
            /* DEBUG */
            backgroundColor: 'gray',
        },
        title: {
            text: `${units.name}`
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Cliquer-glisser dans le zone de point pour agrandir' : 'Pincer le graphique pour zomer'
        },

        xAxis: {
            type: 'datetime',
            // scrollbar: {
            //     enabled: true
            // },
        },
        yAxis: {
            title: {
                text: `${units.name} en ${units.symb}`
            }
        },


        series: [{
            type: 'line',
            name: `${units.unit} ${units.symb}`,
            data: dataPoints
        }]
    });

    console.timeEnd('Drawing chart in')
}

(async () => {
    _toast = new Toast($('toast-container'))

    // Récupération de l'id de la balise depuis l'url (?balise_id=)
    const b_id = window.location.search.split('?')[1].split('=')[1]
    console.log("window b_id:", b_id);

    // Récupération des données de la balise
    const b_data = await fetchNode(b_id)
    console.log('b_data', b_data);

    if (!b_data) {
        _toast.show("", "Aucune donnée disponible pour cette balise", 'info', {
            autohide: false
        })
        $('chartsContainer').innerHTML += '<span class="no-data">Aucune donnée disponible pour cette balise</span>'
    } else {
        // Récupération des capteurs de la balise
        const sensors_list = b_data.sensors_id.split(',')
        console.log('sensors_list', sensors_list);

        const asyncForEach = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        await asyncForEach(sensors_list, async (sensor_id) => {
            // Récupération des valeur à affichier
            var s_data = await fetchValues(sensor_id);
            // if (s_data.length >= 1) {
            let sensors_units = { name: s_data[0].name, unit: s_data[0].unit, symb: s_data[0].symbol }
            let sensors_data = s_data

            // Debug
            console.debug("sensors_data:", sensors_data);
            console.debug("sensors_units:", sensors_units);

            // Création du container
            var container = document.createElement('div')
            container.setAttribute('id', `chartContainer${sensor_id}`)
            $('chartsContainer').appendChild(container)
            $(`chartContainer${sensor_id}`).classList += 'chart';

            // Drawing chart
            drawChart(sensors_data, sensors_units, `chartContainer${sensor_id}`)
            // } else {
            //     _toast.show("error", "Aucune donnée disponible pour ce capteur)")
            // }
        });

        $('battery').innerHTML += b_data.battery_level + '%'

        $('name').innerHTML = b_data.name

    }

})()