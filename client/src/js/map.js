const { API_URL } = require('./base')

var map = L.map('map', { doubleClickZoom: false }).setView([43.05832154846533, 6.170368194580079], 14);

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
        ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    maxZoom: 18
}).addTo(map);


// var marker = [
//     [43.060822251265805, 6.139522937662637],
//     [43.045865340392304, 6.140130198958956]
// ].forEach((coords) => {

//     L.marker(coords, { title: "Balise", balise_id: 12 }
//     ).on('click', markerOnClick).addTo(map);
// })

//fetch data from api

fetch(`${API_URL}/nodes.php`, {
    mode: 'cors',
})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach((balise) => {
            console.log(balise);
            L.marker([balise.latitude, balise.longitude], { title: "Balise", balise_id: Number(balise.balise_id), draggable: true })
                .on('click', markerOnClick)
                .on('moveend', markerOnMove)
                .bindTooltip(`${balise.battery_level}%`, { permanent: false, direction: 'top' })
                .addTo(map);
        }
        )
    }
    )
    .catch(err => console.log(err));

function markerOnClick(e) {
    console.log(e);
    console.log(e.target.options);
}

function markerOnMove(e) {
    console.log(e.sourceTarget._latlng);
}
