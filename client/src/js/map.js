import { API_URL } from './base'

var map = L.map('map', { doubleClickZoom: false }).setView([43.05669098943963, 6.140842437744141], 14);

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
        ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    maxZoom: 18
}).addTo(map);

//fetch data from api
fetch(`${API_URL}/nodes.php`, {
    mode: 'cors',
})
    .then(res => res.json())
    .then(data => {
        console.debug("list balise: ", data);
        data.forEach((balise) => {
            // console.debug(balise);
            L.marker([balise.latitude, balise.longitude], { title: "Balise", balise_id: Number(balise.balise_id), draggable: true })
                .on('click', (e) => {
                    window.open('./charts.html?balise_id=' + e.target.options.balise_id, '_blank');
                })
                .on('moveend', (e) => {
                    console.log(balise.name, e.sourceTarget._latlng);
                })
                .bindTooltip(`${balise.name} | 🔋${balise.battery_level}%`, { permanent: false, direction: 'top' })
                .addTo(map);
        }
        )
    }
    )
    .catch(err => console.log(err));

// map.on('dragend', function (e) {
//     console.log(map.getCenter());
// })