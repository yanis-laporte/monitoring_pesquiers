import { API_URL, $, $$ } from './base';
import { Toast } from './toast';

/**
 * Append to alerts-container a new child
 * @param {Object} data 
 */
async function createAlert(data) {
    let clone = $('alert0').cloneNode(true)
    clone.setAttribute('id', `alert${data.alert_id}`)
    $('alerts-container').appendChild(clone)


    // Nom de l'alerte
    $(`alert${data.alert_id}`).querySelectorAll("span[name='a-name']")[0].innerHTML = data.name
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex = ['>', '=', '<'].indexOf(data.sign) + 1

    // fetch les nodes depuis le cache ou INTERNET
    if (typeof window.cache.nodes[data.balise_id] == 'undefined') {
        balise = await fetchNode(data.balise_id)
        window.cache.nodes[data.balise_id] = balise
    } else {
        balise = window.cache.nodes[data.balise_id]
    }

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
async function fetchNode(balise_id) {
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
async function fetchSensor() {
    return await fetch(`${API_URL}/sensors.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.log(err));
}

/**
 * Make a PATCH request to update the alert with the id passed as parameter
 * @param {Number} alert_id // Alert id 
 */
async function saveChange(alert_id) {
    window.cache.alerts[alert_id].balise_id
    let data = {
        alert_id: alert_id,
        name: $(`alert${alert_id}`).querySelectorAll("span[name='a-name']")[0].innerHTML,
        template: $(`alert${alert_id}`).querySelectorAll("textarea[name='a-template']")[0].value,
        balise_id: window.cache.alerts[alert_id].balise_id,
        sensor_id: $(`alert${alert_id}`).querySelectorAll("select[name='a-sensor']")[0].selectedIndex,
        control: $(`alert${alert_id}`).querySelectorAll("input[name='a-control']")[0].value,
        sign: $(`alert${alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex,
        email: $(`alert${alert_id}`).querySelectorAll("input[name='a-email']")[0].value
    }

    // fetch post
    await fetch(`${API_URL}/alerts.php`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log('PATCH res:', data)
            if (data.errorInfo[0] == "00000") {
                _toast.show('Succès', 'L\'alerte a été sauvegardée avec succès', 'success')
            }
        })
        .catch(err => console.log(err));
}

/**
 * Make a DELETE request to delete the alert with the id passed as parameter
 * @param {Number} alert_id 
 */
async function deleteAlert(alert_id) {
    // delete fetch request
    await fetch(`${API_URL}/alerts.php`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alert_id: alert_id })
    })
        .then(res => res.json())
        .then(data => {
            console.log('DELETE res:', data)
            if (data.errorInfo[0] == "00000") {
                $(`alert${alert_id}`).remove()
                _toast.show('Succès', 'L\'alerte a été supprimée avec succès', 'success')
            }
        })
        .catch(err => console.log(err));
}

(async () => {
    // Declare toast container
    _toast = new Toast($('toast-container'))

    window.cache = {
        sensors: await fetchSensor(),
        nodes: [],
        alerts: []
    }
    console.log('sensors', cache.sensors);

    // Getting alerts
    await fetch(`${API_URL}/alerts.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => {
            window.cache.alerts = data
            data.forEach(async (data) => {
                await createAlert(data);
            })
        })
        .catch(err => console.log(err));

    let floopy = document.getElementsByClassName('save')
    for (let i = 0; i < floopy.length; i++) {
        floopy[i].addEventListener('click', OnSaveClick)
    }
    let wastebasket = document.getElementsByClassName('wastebasket')
    for (let i = 0; i < wastebasket.length; i++) {
        wastebasket[i].addEventListener('click', OnWastebasketClick)
    }
    // // Alert Save button
    // $('al-save').addEventListener('click', (e) => {
    //     console.log(e);
    // })
})()


$('addAlert').addEventListener('click', () => {
    var a = document.createElement('div')
    a.innerHTML = $('alert0').innerHTML
    // a.innerHTML = a.innerHTML.replace('Nom Balise', d.name)
    a.className = 'alert-item'
    a.setAttribute('id', `alert${$('alerts-container').children.length}`)
    $('alerts-container').appendChild(a)

    //
    let floopy = document.getElementsByClassName('save')
    floopy[floopy.length - 1].addEventListener('click', OnSaveClick)
    let wastebasket = document.getElementsByClassName('wastebasket')
    wastebasket[wastebasket.length - 1].addEventListener('click', OnWastebasketClick)
})

function OnSaveClick(e) { saveChange(e.path[3].id.split('alert')[1]) }
function OnWastebasketClick(e) { if (confirm('Are you sure you want to delete this alert ?')) deleteAlert(e.path[3].id.split('alert')[1]) }


// Alert delete button
$('al-delete').addEventListener('click', () => { })