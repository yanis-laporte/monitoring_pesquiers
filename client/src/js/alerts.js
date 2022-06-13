import { API_URL, $ } from './base';
import { Toast } from './toast';
const _toast = new Toast($('toast-container'));

//#region fetch get data

/**
 * Retourne les balises
 * @returns {Array} Contient la liste des balises
 */
async function fetchNodes() {
    return await fetch(`${API_URL}/nodes.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error(err));
}

/**
 * Récupère les capteurs
 * @returns {Array} Contient la liste de tout les capteurs
 */
async function fetchSensors() {
    return await fetch(`${API_URL}/sensors.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error(err));
}

/**
 * Récupère les alertes
 * @returns {Object} Contient les données de l'alerte
 */
async function fetchAlerts() {
    return await fetch(`${API_URL}/alerts.php`, {
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.error(err));
}

/**
 * Renvoie les données en fonction de balise_id
 * @param {Number} balise_id id de la balise demandée
 * @returns {Object} Contient les données de la balise
 */
function getNode(balise_id) {
    return window.pCache.nodes.filter(x => x.balise_id == balise_id)[0]
}

//#endregion fetch get data

/**
 * Met à jour le select des capteurs en fonction de la balise sélectionnée
 * @param alert_id id de l'alerte
 * @param balise_id id de la balise à laquelle l'alerte est liée
 */
async function updateSensorsSelect(alert_id, balise_id) {
    // Placeholder
    $(`alert${alert_id}`).querySelector("select[name='sensors-select']").innerHTML = '<option value="0" selected disabled hidden>Sélectionner un capteur</option>'

    /* Récupère les données des capteurs de la balise */
    const balise = await getNode(balise_id)
    const balise_sensors = window.pCache.sensors.filter((x) => balise.sensors_id.includes(x.sensor_id));
    // Ajoute les options à sensors-select
    balise_sensors.forEach((s) => {
        let option = document.createElement('option')
        option.value = s.sensor_id
        option.innerHTML = `${s.name} (${s.symbol})`
        $(`alert${alert_id}`).querySelector("select[name='sensors-select']").appendChild(option)
    })
}

/**
 * Ajoute un enfant à alerts-container et le rempli avec les données en paramètre
 * @param {Object} data données de l'alerte {alert_id, name, balise_id, sensor_id, control, sign}
 * @param {Boolean} [has_data=false] si les données fournis doivent être utilisées pour remplir l'alerte
 */
async function createAlert(data, _has_data) {
    let has_data = _has_data || false;
    console.debug('createAlert new', data, has_data);

    // Création du div alert et ajout dans le DOM
    let clone = $('alert0').cloneNode(true)
    clone.setAttribute('id', `alert${data.alert_id}`)
    $('alerts-container').appendChild(clone)

    // Ajoute les options à balise-select
    window.pCache.nodes.forEach((node) => {
        let option = document.createElement('option')
        option.value = node.balise_id
        option.innerHTML = `${node.name} #${node.balise_id}`
        $(`alert${data.alert_id}`).querySelectorAll("select[name='balise-select']")[0].appendChild(option)
    })

    // Met à jour le select des capteurs en fonction de la balise sélectionnée

    /* Remplissage des inputs si has_data = true */
    if (has_data) {
        await updateSensorsSelect(data.alert_id, data.balise_id)
        $(`alert${data.alert_id}`).querySelector("select[name='balise-select']").value = data.balise_id
        $(`alert${data.alert_id}`).querySelector("select[name='sensors-select']").value = data.sensor_id
        $(`alert${data.alert_id}`).querySelector("select[name='signs-select']").selectedIndex = ['>', '<'].indexOf(data.sign) + 1
        $(`alert${data.alert_id}`).querySelector("input[name='control-in']").value = data.control
    }
}

/**
 * Sauvegarde les changements fait à une alertes (PATCH),
 * si l'alerte n'existe pas, elle est créée (POST)
 * @param {Number} alert_id id de l'alerte qui va doit être sauvegardée 
 */
async function saveChange(alert_id) {
    console.debug('<saveChange> alert_id:', alert_id);

    // true si c'est une nouvelle alerte et false si c'est une alerte existante
    const is_new = (typeof (window.pCache.alerts.filter(x => x.alert_id == alert_id)[0]) == 'object') ? false : true;
    console.debug('<saveChange> is_new:', is_new);

    // Récupère les données de l'alerte
    const data = {
        balise_id: $(`alert${alert_id}`).querySelector("select[name='balise-select']").value,
        sensor_id: $(`alert${alert_id}`).querySelector("select[name='sensors-select']").value,
        control: $(`alert${alert_id}`).querySelector("input[name='control-in']").value,
        sign: ['>', '<'][$(`alert${alert_id}`).querySelector("select[name='signs-select']").selectedIndex - 1],
    }

    console.debug('<saveChange> data:', data);

    /* Modification d'une alerte */
    async function patch(data) {
        data.alert_id = alert_id;

        // Requête PATCH
        await fetch(`${API_URL}/alerts.php`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                // Réponse
                console.log('PATCH:', data, 'res:', res);
                // Code erreur succès
                if (res[0] == "00000") {
                    _toast.show('Succès', 'L\'alerte a été sauvegardée avec succès', 'success');
                } else {
                    console.error('PATCH error:', res);
                    _toast.show('Erreur', 'Formulaire incomplet', 'danger');
                }
            })
            .catch(err => {
                console.error(err);
                _toast.show('Erreur', 'Une erreur de communication est survenue', 'danger');
            }
            );
    }

    /* Nouvelle alerte */
    async function post(data) {
        // Requête POST
        await fetch(`${API_URL}/alerts.php`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                // Réponse
                console.log('POST:', data, 'res:', res);
                // Code erreur succès
                if (res[0] == "00000") {
                    _toast.show('Succès', 'L\'alerte a été crée avec succès', 'success');
                    // Met à jour le cache des alerts
                    fetchAlerts().then((alerts) => {
                        window.pCache.alerts = alerts;
                    });
                } else {
                    console.error('POST error: ', res);
                    _toast.show('Erreur', 'Formulaire incomplet', 'danger');
                }
            })
            .catch(err => {
                console.error(err);
                _toast.show('Erreur', 'Une erreur de communication est survenue', 'danger');
            });
    }

    // post ou patch
    is_new ? post(data) : patch(data)
}

/**
 * Supprime une alerte
 * @param {Number} alert_id id de l'alerte qui va doit être supprimer
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
        .then(res => {
            console.log('DELETE:', alert_id, 'res:', res)
            // Code erreur succès
            if (res[0] == "00000") {
                // Suppression de l'alerte du DOM
                $(`alert${alert_id}`).remove()
                _toast.show('Succès', 'L\'alerte a été supprimée avec succès', 'success')
            }
        })
        .catch(err => {
            console.error(err);
            _toast.show('Erreur', 'Une erreur est survenue lors de la suppression de l\'alerte', 'danger');
        });
}


//#region handleEvents
// 4 = index du div container
/* Appuie sur bouton sauvegarder */
function OnSaveClick(e) { saveChange(e.path[4].id.split('alert')[1]) }
/* Appuie sur bouton supprimer */
function OnWastebasketClick(e) { if (confirm('Êtes vous sur de vouloir supprimer cette alerte ?')) deleteAlert(e.path[4].id.split('alert')[1]) }
/* Changement de balise d'une alerte */
function OnBaliseChange(e) { updateSensorsSelect(e.path[2].id.split('alert')[1], this.value) }
//#endregion



/**
 * Fonction principale
 */

(async () => {
    // Déclare le container des toasts

    // Déclaration du cache
    window.pCache = {
        sensors: await fetchSensors(),
        nodes: await fetchNodes(),
        alerts: await fetchAlerts(),
    }

    console.debug('Cache: ', window.pCache);

    // Itération des alertes et création des alerts
    window.pCache.alerts.forEach((alert) => {
        createAlert(alert, true)
    })

    // Select balise
    let balise = document.querySelectorAll("select[name='balise-select']")
    balise[balise.length - 1].addEventListener('change', OnBaliseChange)
    // Boutons
    // sauvegarder
    let floppy = document.getElementsByClassName('btn-save')
    for (let i = 0; i < floppy.length; i++) {
        floppy[i].addEventListener('click', OnSaveClick)
    }
    // supprimer
    let wastebasket = document.getElementsByClassName('btn-wastebasket')
    for (let i = 0; i < wastebasket.length; i++) {
        wastebasket[i].addEventListener('click', OnWastebasketClick)
    }

    // Notification de changement non sauvegardé
    // document.querySelectorAll('input, select').forEach((e) => {
    //     e.addEventListener('change', (e) => {
    //         console.log(e.target.name, e.target.value);
    //         _toast.show('Attention', 'Vous devez sauvegarder vos changements', 'warning')
    //     })
    // })


    // Ajoute une alerte vierge
    $('add-alert').addEventListener('click', () => {
        let id = $('alerts-container').lastChild.id;
        createAlert({
            // récup le plus grand id de la liste des alertes
            alert_id: id ? Number(id.split('alert')[1]) + 1 : 1,
            name: "",
            balise_id: 0,
            sensor_id: 0,
            control: undefined,
            sign: undefined
        }, false)

        // Select balise
        let balise = document.querySelectorAll("select[name='balise-select']")
        balise[balise.length - 1].addEventListener('change', OnBaliseChange)
        // Btn sauvegarder
        let floppy = document.getElementsByClassName('btn-save')
        floppy[floppy.length - 1].addEventListener('click', OnSaveClick)
        // Btn supprimer
        let wastebasket = document.getElementsByClassName('btn-wastebasket')
        wastebasket[wastebasket.length - 1].addEventListener('click', OnWastebasketClick)
    })
})()
