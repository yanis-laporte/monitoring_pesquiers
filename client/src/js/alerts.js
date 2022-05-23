import { API_URL, $, $$ } from './base';
import { Toast } from './toast';

/**
 * Ajoute un enfant à alerts-container et le rempli avec les données en paramètre
 * @param {Object} data donnée de l'alerte {alert_id, balise_id, sign, name, control}
 */
async function createAlert(data) {
    console.log("alert data: ", data);

    // Création du div alert et ajout dans le container
    let clone = $('alert0').cloneNode(true)
    clone.setAttribute('id', `alert${data.alert_id}`)
    $('alerts-container').appendChild(clone)

    // Récupère la balise
    balise = await getNode(data.balise_id)
    // Crée un array avec les données des capteurs présent dans la balise
    var balise_sensors = window.pCache.sensors.filter((x) => balise.sensors_id.includes(x.sensor_id));
    // Crée les options du select
    balise_sensors.forEach((s) => {
        let option = document.createElement('option')
        option.value = s.sensor_id
        option.innerHTML = `${s.name} (${s.symbol})`
        $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sensor']")[0].appendChild(option)
    })

    // Afficher les données dans les inputs
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex = ['>', '<'].indexOf(data.sign) + 1
    $(`alert${data.alert_id}`).querySelectorAll("input[name='a-control']")[0].value = data.control
    $(`alert${data.alert_id}`).querySelectorAll("input[name='a-name']")[0].innerHTML = data.name
    $(`alert${data.alert_id}`).querySelectorAll("select[name='a-sensor']")[0].value = data.sensor_id
}

/**
 * Retourne la balise demandée
 * Cache: cache.balises
 * @param {Number} balise_id id de la balise demandée
 * @returns 
 */
async function getNode(balise_id) {
    // Vérifie si la balise n'est pas dans le cache
    if (typeof window.pCache.nodes[balise_id] == 'undefined') {
        console.log('cache', balise_id);
        window.pCache.nodes[balise_id] =
            await fetch(`${API_URL}/nodes.php?balise_id=${balise_id}`, {
                mode: 'cors',
            })
                .then(res => res.json())
                .then(data => {
                    return data
                })
                .catch(err => console.error(err));
    }

    return window.pCache.nodes[balise_id]
}

/**
 * Recupère tout les sensors
 * @returns {Object} Contients la liste de tout les capteurs
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
 * Sauvegarde les changements fait à une alertes (PATCH), si l'alerte n'existe pas, elle est crée (POST)
 * @param {Number} alert_id id de l'alerte qui va être sauvegardée 
 */
async function saveChange(alert_id) {
    console.debug("saveChange alert_id: ", alert_id);

    // Récupère les données de l'alerte avec l'id `alert_id`
    const alert = window.pCache.alerts.filter(x => x.alert_id == alert_id)[0]

    // Récupère les données depuis les inputs
    let data = {
        name: $(`alert${alert_id}`).querySelectorAll("input[name='a-name']")[0].innerHTML,
        // template: $(`alert${alert_id}`).querySelectorAll("textarea[name='a-template']")[0].value,
        balise_id: 1,
        sensor_id: $(`alert${alert_id}`).querySelectorAll("select[name='a-sensor']")[0].selectedIndex,
        control: $(`alert${alert_id}`).querySelectorAll("input[name='a-control']")[0].value,
        sign: ['>', '<'][$(`alert${alert_id}`).querySelectorAll("select[name='a-sign']")[0].selectedIndex - 1]
    }

    // Si l'alerte n'existe pas ont la crée, sinon on la met à jour
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
                // Code erreur succsè
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
                // Code erreur succès
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
 * Supprime une alerte
 * @param {Number} alert_id id de l'alerte qui va être supprimer
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
            // Code erreur succès
            if (data.errorInfo[0] == "00000") {
                // Suppresion de l'alerte du DOP
                $(`alert${alert_id}`).remove()
                _toast.show('Succès', 'L\'alerte a été supprimée avec succès', 'success')
            }
        })
        .catch(err => {
            console.error(err);
            _toast.show('Erreur', 'Une erreur est survenue lors de la suppression de l\'alerte', 'danger');
        });
}

/**
 * Fonction principale
 */
(async () => {
    // Déclare le container des toasts
    _toast = new Toast($('toast-container'))

    // Déclaration du cache
    window.pCache = {
        sensors: await fetchSensor(),
        nodes: [],
        alerts: []
    }
    // console.log('List sensors: ', window.Pcache.sensors);

    // Récupération des alertes
    await fetch(`${API_URL}/alerts.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => {
            window.pCache.alerts = data
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

    // Bouton sauvegarder et supprimer
    let floopy = document.getElementsByClassName('save')
    for (let i = 0; i < floopy.length; i++) {
        floopy[i].addEventListener('click', OnSaveClick)
    }
    let wastebasket = document.getElementsByClassName('wastebasket')
    for (let i = 0; i < wastebasket.length; i++) {
        wastebasket[i].addEventListener('click', OnWastebasketClick)
    }
})()

// Bouton de création d'une nouvelle alerte
$('addAlert').addEventListener('click', () => {
    var a = document.createElement('div')
    a.innerHTML = $('alert0').innerHTML
    // a.innerHTML = a.innerHTML.replace('Nom Balise', d.name)
    a.className = 'alert-item'
    a.setAttribute('id', `alert${$('alerts-container').children.length}`)
    $('alerts-container').appendChild(a)

    // Bouton sauvegarder et supprimer
    let floopy = document.getElementsByClassName('save')
    floopy[floopy.length - 1].addEventListener('click', OnSaveClick)
    let wastebasket = document.getElementsByClassName('wastebasket')
    wastebasket[wastebasket.length - 1].addEventListener('click', OnWastebasketClick)
})

// Handle l'appuis des boutons de sauvegarde et suppression
// 4 = index du div container
function OnSaveClick(e) { saveChange(e.path[4].id.split('alert')[1]) }
function OnWastebasketClick(e) { if (confirm('Êtes vous sur de vouloir supprimer cette alerte ?')) deleteAlert(e.path[4].id.split('alert')[1]) }