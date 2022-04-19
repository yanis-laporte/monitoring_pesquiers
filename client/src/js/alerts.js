import { API_URL, $, $$ } from './base';

/**
 * Append to alerts-container a new child
 * @param {Object} data 
 */
const createAlert = async (data) => {
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

/**
 * Make a PATCH request to update the alert with the id passed as parameter
 * @param {Number} id // Alert id 
 */
const saveChange = async (alert_id) => {
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
            console.log('PACH res:', data)
            if (data.errorInfo[0] == "00000") {
                // show sucess popup
            }
        })
        .catch(err => console.log(err));
}

const deleteAlert = async (alert_id) => {
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
                // show sucess popup
            }
        })
        .catch(err => console.log(err));
}

(async () => {
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

    let disquettes = document.getElementsByClassName('save')
    for (let i = 0; i < disquettes.length; i++) {
        disquettes[i].addEventListener('click', (e) => {
            // get item alertid
            saveChange(e.path[3].id.split('alert')[1])
        })

    }
    let poubelles = document.getElementsByClassName('wastebasket')
    for (let i = 0; i < disquettes.length; i++) {
        poubelles[i].addEventListener('click', (e) => {
            // get item alertid
            deleteAlert(e.path[3].id.split('alert')[1])
        })
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
})


// Alert delete button
$('al-delete').addEventListener('click', () => { })