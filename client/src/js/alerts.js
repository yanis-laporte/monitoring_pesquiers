import { API_URL, $, $$ } from './base';

/**
 * Append to alerts-container a new child
 * @param {Object} data 
 */
const createAlert = async (data) => {
    let clone = $('alert0').cloneNode(true)
    clone.setAttribute('id', `alert${data.alert_id}`)
    $('alerts-container').appendChild(clone)


    $(`alert${data.alert_id}`).querySelectorAll("span[name='a-name']")[0].innerHTML = data.name
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex = ['>', '=', '<'].indexOf(data.sign) + 1

    // Fetch les données de la balise
    let balise = await fetchNode(data.balise_id)

    // Recupère la liste des capteurs
    // Filtre uniquemet les capteurs de la balise
    // Ajouter un element 'option' du select 'a-sensor'
    var balise_sensors = window.cache.sensors.filter((x) => balise[0].sensors_id.includes(x.sensor_id));
    balise_sensors.forEach((s) => {
        let option = document.createElement('option')
        option.value = s.sensor_id
        option.innerHTML = `${s.name} (${s.symbole})`
        $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sensor']")[0].appendChild(option)
    })

    $(`alert${data.alert_id}`).querySelectorAll("input[name='a-control']")[0].value = data.control
    $(`alert${data.alert_id}`).querySelectorAll("input[name='a-email']")[0].value = data.email
    $(`alert${data.alert_id}`).querySelectorAll("textarea[name='a-template']")[0].value = data.template
}

/**
 * Fetch the node with the id passed as parameter
 * @param {Number} balise_id id of the balise you want to fetch
 * @returns 
 */
const fetchNode = async (balise_id) => {
    return await fetch(`${API_URL}/nodes.php?id=${balise_id}`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => console.log(err));
}

/**
 * fetch all sensors
 * @returns {Object}
 */
const fetchSensor = async () => {
    return await fetch(`${API_URL}/sensors.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.log(err));
}

$('addAlert').addEventListener('click', () => {
    var a = document.createElement('div')
    a.innerHTML = alertElement
    // a.innerHTML = a.innerHTML.replace('Nom Balise', d.name)
    a.className = 'alert-item'
    a.setAttribute('id', `alert${alertContainer.children.length}`)
    console.log(a);
    alertContainer.appendChild(a)
})

const alertElement = $('alert0').innerHTML
const alertContainer = $('alerts-container');

(async () => {
    window.cache = {
        sensors: await fetchSensor()
    }
    console.log('sensors', cache.sensors);

    // Getting alerts
    fetch(`${API_URL}/alerts.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(async (data) => {
                console.log(data)
                await createAlert(data);
            })
        })
        .catch(err => console.log(err));

})()


