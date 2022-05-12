import { API_URL, $, $$ } from './base';
import { Toast } from './toast';

/**
 * Ajotue un enfant à alerts-container et le remplit avec les données de l'alerte
 * @param {Object} data 
 */
async function createAlert(data) {
    console.log("alert data: ", data);

    // Création du div alert et ajout dans le container
    let clone = $('alert0').cloneNode(true)
    clone.setAttribute('id', `alert${data.alert_id}`)
    $('alerts-container').appendChild(clone)

    // 
    balise = await getNode(data.balise_id)
    var balise_sensors = window.cache.sensors.filter((x) => balise.sensors_id.includes(x.sensor_id));
    balise_sensors.forEach((s) => {
        let option = document.createElement('option')
        option.value = s.sensor_id
        option.innerHTML = `${s.name} (${s.symbol})`
        $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sensor']")[0].appendChild(option)
    })

    // Signe
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex = ['>', '<'].indexOf(data.sign) + 1
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sensor']")[0].value = data.sensor_id
    $(`alert${data.alert_id}`).querySelectorAll("span[name='a-name']")[0].innerHTML = data.name
    $(`alert${data.alert_id}`).querySelectorAll("input[name='a-control']")[0].value = data.control
    // $(`alert${data.alert_id}`).querySelectorAll("input[name='a-email']")[0].value = data.email
    // $(`alert${data.alert_id}`).querySelectorAll("textarea[name='a-template']")[0].value = data.template
}

/**
 * Retourne la balise demandée
 *  * @param {Number} balise_id id le balise
 * @returns 
 */
async function getNode(balise_id) {
    // Vérifie si la balise est déjà dans le cache
    if (typeof window.cache.nodes[balise_id] == 'undefined') {
        console.log('cache', balise_id);
        window.cache.nodes[balise_id] =
            await fetch(`${API_URL}/nodes.php?id=${balise_id}`, {
                mode: 'cors',
            })
                .then(res => res.json())
                .then(data => {
                    return data
                })
                .catch(err => console.error(err));
    }

    return window.cache.nodes[balise_id]
}

/**
 * Recupère tout les sensors
 * @returns {Object}
 */
async function fetchSensor() {
    return await fetch(`${API_URL}/sensors.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error(err));
}

/**
 * Make a PATCH request to update the alert with the id passed as parameter
 * @param {Number} alert_id // Alert id 
 */
async function saveChange(alert_id) {
    console.log("saveChange alert_id: ", alert_id);

    const alert = window.cache.alerts.filter(x => x.alert_id == alert_id)[0]
    console.log(alert);

    let data = {
        name: $(`alert${alert_id}`).querySelectorAll("span[name='a-name']")[0].innerHTML,
        // template: $(`alert${alert_id}`).querySelectorAll("textarea[name='a-template']")[0].value,
        balise_id: 1,
        sensor_id: $(`alert${alert_id}`).querySelectorAll("select[name='a-sensor']")[0].selectedIndex,
        control: $(`alert${alert_id}`).querySelectorAll("input[name='a-control']")[0].value,
        sign: ['>', '<'][$(`alert${alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex - 1],
        email: null
        // email: $(`alert${alert_id}`).querySelectorAll("input[name='a-email']")[0].value
    }

    if (!alert) {
        // Nouvelles alertes
        await fetch(`${API_URL}/alerts.php`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log('POST res:', data)
                if (data.errorInfo[0] == "00000") {
                    _toast.show('Succès', 'L\'alerte a été crée avec succès', 'success')
                }
            })
            .catch(err => {
                console.error(err)
                _toast.show('Erreur', 'Une erreur est survenue lors de la création de l\'alerte', 'danger')
            });


    } else {
        // Mise à jour des alertes
        data.alert_id = alert_id;
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
            .catch(err => {
                console.error(err)
                _toast.show('Erreur', 'Une erreur est survenue lors de l\'enregistrement de l\'alerte', 'danger')
            }
            );
    }

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
        .catch(err => {
            console.error(err);
            _toast.show('Erreur', 'Une erreur est survenue lors de la suppression de l\'alerte', 'danger');
        });
}

(async () => {
    // Declare toast container
    _toast = new Toast($('toast-container'))

    window.cache = {
        sensors: await fetchSensor(),
        nodes: [],
        alerts: []
    }
    console.log('List sensors: ', cache.sensors);

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
        .catch(err => {
            _toast.show('Erreur', 'Erreur lors de la récupération des alertes', 'danger', {
                autohide: false
            })
            console.error(err)
        });

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

// 4 = index du div container
function OnSaveClick(e) { saveChange(e.path[4].id.split('alert')[1]) }
function OnWastebasketClick(e) { if (confirm('Êtes vous sur de vouloir supprimer cette alerte ?')) deleteAlert(e.path[4].id.split('alert')[1]) }


// Alert delete button
$('al-delete').addEventListener('click', () => { })