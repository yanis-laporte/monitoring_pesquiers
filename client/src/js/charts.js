import { API_URL, $, $$, asyncForEach } from './base';
import { Toast } from './toast';

/**
 * Retourne les données d'une balise
 * @param id id de la balise
 * @returns {JSON}
 */
async function fetchNode(id) {
    return await fetch(`${API_URL}/nodes.php?balise_id=${id}`)
        .then(res => res.json())
}

/**
 * Retourne les valerus du captuer
 * @param id id du capteur
 * @returns {JSON}
 */
async function fetchValues(s_id, b_id, from, to) {
    url = `${API_URL}/values.php?u=true&sensor_id=${s_id}&balise_id=${b_id}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}`
    return await fetch(url)
        .then(res => res.json())
}

/**
 * Dessine le graphique dans le container
 */
async function drawChart(data, units, container) {
    console.debug('data:', data, 'units:', units, 'container:', container);

    // Création du tableau de données
    // [timestamp, value]
    let dataPoints = [];
    let dataPointsY = data.map(e => parseInt(e.value));
    let dataPointsX = data.map(e => new Date(e.timestamp).getTime());
    dataPointsY.forEach((e, i) => {
        // Value, Timestamp
        dataPoints.push([dataPointsX[i], dataPointsY[i],])
    });

    // Traduction des textes
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

    var chart = Highcharts.chart(container, {
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

        // timezone
        time: {
            timezone: 'Europe/Paris'
        },

        // Bouton télécharger
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

        // 
        exporting: {
            buttons: {
                // Menu hamburger
                contextButton: {
                    enabled: true,
                    menuItems: ["downloadPNG", "downloadJPEG", "downloadXLS", "separator", "printChart", "viewFullscreen"]
                },
                // Bouton télécharger
                exportButton: {
                    text: 'Télécharger',
                    menuItems: [
                        'downloadPNG',
                        'downloadJPEG',
                        'separator',
                        'downloadXLS',
                    ]
                }
            }
        },

        chart: {
            zoomType: 'x',
            borderRadius: 5,
            /* DEBUG */
            // backgroundColor: 'gray',
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
                text: `${units.name} en ${units.symbol}`
            }
        },


        series: [{
            type: 'line',
            name: `${units.name} ${units.symbol}`,
            data: dataPoints
        }]
    });

    return await chart;


}

/**
 * Gère l'affichage de l'icon du niveau de batterie
 * @param {Number} level Niveau de batterie
 * @returns {String}} Icon du niveau de batterie + Niveau de batterie
 */
function batteryIcon(level) {
    /**
     * Recréation de la function map dans arduino
     * https://forum.unity.com/threads/re-map-a-number-from-one-range-to-another.119437/#post-800377
     */
    function remap(value, from1, to1, from2, to2) {
        return (value - from1) / (to1 - from1) * (to2 - from2) + from2
    }

    return `
    <i class="fas fa-battery-${['empty', 'quarter', 'half', 'three-quarters', 'full'][Math.floor(remap(level, 0, 100, 0, 4))]}"></i>
    <span>${level} %</span>
    `
}

(async () => {
    // Registre des graphs
    const graphs = [];
    // Déclaration du Toast
    _toast = new Toast($('toast-container'))

    // Récupération de l'id de la balise depuis l'url (?balise_id=)
    const b_id = window.location.search.split('?')[1].split('=')[1]
    console.debug("query b_id:", b_id);

    // Récupération des données de la balise
    const b_data = await fetchNode(b_id)
    console.debug('b_data', b_data);

    // Affichage niveau de batterie + nom de la balise
    $('battery').innerHTML = batteryIcon(b_data.battery_level)
    $('name').innerHTML = b_data.name

    if (!b_data) { // ~-> La balise n'existe pas
        _toast.show("", "Aucune donnée disponible pour cette balise", 'info', {
            autohide: false
        })
        $('chartsContainer').innerHTML += '<span class="no-data">Aucune donnée disponible pour cette balise</span>'

    } else {
        // Récupération des capteurs de la balise
        const sensors_list = b_data.sensors_id.split(',')
        console.debug('sensors_list', sensors_list);

        await asyncForEach(sensors_list, async (sensor_id) => {
            // Récupération des valeurs à afficher
            var s_data = await fetchValues(sensor_id, b_id);

            console.debug('s_data', s_data);

            // Aucune valeur pour ce capteur
            if (s_data.values.length == 0) {
                _toast.show(`${s_data.params.u.name}`, 'Aucune valeur disponible pour ce capteur', 'warning', { autohide: false })

                graphs.push(null);
            } else {
                let sensors_units = s_data.params.u
                let sensors_data = s_data.values

                // Debug
                console.debug("sensors_data:", sensors_data);
                console.debug("sensors_units:", sensors_units);

                // Création du container
                var container = document.createElement('div')
                container.setAttribute('id', `chartContainer${sensor_id}`)
                $('chartsContainer').appendChild(container)
                $(`chartContainer${sensor_id}`).classList += 'chart';

                // Drawing chart
                graphs.push(await drawChart(sensors_data, sensors_units, `chartContainer${sensor_id}`));
            }

        });

        // $('changeLayout')

        $('trFrom').addEventListener('change', (d) => { console.log(new Date(d.target.value)); })
        $('trTo').addEventListener('change', (d) => { console.log(new Date(d.target.value)); })
        // $('trFrom').value = new Date().toISOString().slice(0, 16)
        // $('trTo').value = new Date().toISOString().slice(0, 16)
    }


    $('quickranges').addEventListener('change', (d) => {
        console.log(d.target.value);

        b_data.sensors_id.split(',').forEach((sensor_id, index) => {
            from = new Date()
            to = new Date()
            from.setDate(from.getDate() + 0)
            to.setDate(to.getDate() + 10)
            values = fetchValues(sensor_id, b_id, from = '', to = '')
            graphs[index].series[0].setData(values);
            graphs[index].redraw();

        });
    })

    $('trFrom').addEventListener('change', () => {
        $('redrawBtn').classList = 'change'
    });

    $('trTo').addEventListener('change', () => {
        $('redrawBtn').classList = 'change'
    })

    $('redrawBtn').addEventListener('click', () => {
        $('redrawBtn').classList = ''
        updateCharts()
    })

    function updateCharts() {
        const sensors_list = b_data.sensors_id.split(',')

        asyncForEach(sensors_list, async (sensor_id, i) => {
            data = await fetchValues(sensor_id, b_id, $('trFrom').value, $('trTo').value)

            if (data.values.length > 0) {
                console.debug('redraw chart', i, data);

                // Création du tableau de données
                // [timestamp, value]
                let dataPoints = [];
                let dataPointsY = data.values.map(e => parseInt(e.value));
                let dataPointsX = data.values.map(e => new Date(e.timestamp).getTime());
                dataPointsY.forEach((e, i) => {
                    // Value, Timestamp
                    dataPoints.push([dataPointsX[i], dataPointsY[i],])
                });

                // Met à jour les points + redessine le graph
                graphs[i].series[0].setData(dataPoints, true);

            } else {
                _toast.show(`${data.params.u.name}`, 'Aucune valeur disponible pour ce capteur dans l\'intervalle ', 'warning', { autohide: true })
            }
        });
    }
})()
