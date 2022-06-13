import { API_URL, $, $$ } from './base';

const translation = {
    id: 'ID',
    balise_id: 'Balise ID',
    sensor_id: 'Sensor ID',
    value: 'Valeurs',
    timestamp: 'Date',
    asc: 'Ascendant',
    desc: 'Descendant',
    true: 'Oui',
    false: 'Non',
}

const params = {
    values: {
        u: {
            type: 'select',
            default: false,
            optional: true,
            allowed: [true, false],
            description: "Avec les unités"
        },
        balise_id: {
            type: 'number',
            default: '',
            optional: true,
            description: "Balise ID"
        },
        sensor_id: {
            type: 'number',
            default: '',
            optional: true,
            description: "ID du capteur"
        },
        from: {
            type: 'datetime-local',
            default: '',
            optional: true,
            description: "Date de début"
        },
        to: {
            type: 'datetime-local',
            default: '',
            optional: true,
            description: "Date de fin"
        },
        sort: {
            type: 'select',
            default: 'asc',
            optional: true,
            allowed: ['asc', 'desc'],
            description: "trier par ordre"
        },
        sby: {
            type: 'select',
            default: 'id',
            optional: true,
            allowed: ['id', 'balise_id', 'sensor_id', 'value', 'timestamp'],
            description: "trier par"
        },
        limit: {
            type: 'number',
            default: '',
            optional: true,
            placeholder: 'lignes',
            description: "Nombre maximum de ligne"
        },
    },
    sensors: {
        sensor_id: {
            type: 'number',
            default: '',
            optional: true,
            description: "ID du capteur"
        },
        sort: {
            type: 'select',
            default: 'asc',
            optional: true,
            allowed: ['asc', 'desc'],
            description: "trier par ordre"
        }
    },
    nodes: {
        sensor_id: {
            type: 'string',
            default: '',
            optional: true,
            placeholder: 'IDS de capteurs',
            description: "IDs de capteurs séparé par des virgules"
        },
        sort: {
            type: 'select',
            default: 'asc',
            optional: true,
            allowed: ['asc', 'desc'],
            description: "trier par ordre"
        },
        sby: {
            type: 'select',
            default: 'id',
            optional: true,
            allowed: ['id', 'balise_id', 'sensor_id', 'value', 'timestamp'],
            description: "trier par"
        },
        limit: {
            type: 'number',
            default: '',
            optional: true,
            placeholder: 'lignes',
            description: "Nombre maximum de ligne"
        },
    },
    alerts: {
        sort: {
            type: 'select',
            default: 'asc',
            allowed: ['asc', 'desc'],
            description: "trier par ordre"
        },
        limit: {
            type: 'number',
            default: '',
            description: "Nombre maximum de ligne"
        },
    }
}

// Affichage des options
$('Ex-select').addEventListener('change', (e) => {
    // Type de donnée à exporter
    const expo = e.target.value;

    $('Ex-options').innerHTML = '';

    // Affichage bouton
    $('Ex-btn').classList.remove('hidden');

    // Affichage des options
    // Itération des options et affichage de ceux-ci
    Object.keys(params[expo]).forEach(paramName => {
        let param = params[expo][paramName];

        // input + label wrapper
        let div = document.createElement('div');
        div.className = 'option-item';
        $('Ex-options').appendChild(div)
        let listDiv = $('Ex-options').querySelectorAll('div')
        let item = $('Ex-options').querySelectorAll('div')[listDiv.length - 1]

        // label
        let label = document.createElement('label');
        label.setAttribute('for', paramName);
        label.innerHTML = param.description;
        item.appendChild(label)

        if (param.type == 'select') {
            // Paramètre de type select
            let select = document.createElement('select');
            // Attributs du input
            select.name = paramName;
            (param.optional) ? select.classList.add('optional') : null;
            // Ajout à l'élément
            item.appendChild(select)

            param.allowed.forEach(option => {
                let el = document.createElement('option')
                el.value = option;
                el.innerHTML = (translation[option] ? translation[option] : option)
                // Ajout à l'élément
                item.querySelectorAll(`select[name='${paramName}']`)[0].appendChild(el)

            })
        } else {
            // Paramètre de type input
            let input = document.createElement('input');
            // Attributs du input
            input.value = (translation[param.default] ? translation[param.default] : param.default);
            input.type = param.type;
            input.placeholder = (param.placeholder) ? param.placeholder : param.description;
            input.name = paramName;
            (param.optional) ? input.classList.add('optional') : null;
            // Ajout à l'élément
            item.appendChild(input)

        }
    })

})


$('Ex-btn').addEventListener('click', (e) => {
    let _params = params[$('Ex-select').value];
    let body = { 'type': $('Ex-select').value };
    Object.keys(_params).forEach(paramName => {
        let value = $$(paramName)[0].value;
        if (value) body[paramName] = value;
    })
    const queryURL = new URL(`${window.location.origin}${API_URL}/export.php`)
    // Génère la requête avec les paramètres
    Object.keys(body).forEach(key => {
        queryURL.searchParams.append(key, body[key])
    });

    fetch(queryURL, {
        method: 'GET',
    })
        // Convertie la réponse en blob
        .then(data => data.blob({ type: "text/csv;charset=UTF-8" }))
        .then(blob => {
            // Crée le lien vers le blob
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            // Lien du blob
            a.href = url;
            // Nom du fichier
            a.download = `export_${$('Ex-select').value}_${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-').replace(', ', '_')}.csv`;
            // Lance le téléchargement du fichier
            a.click();
            // Libère la mémoire
            window.URL.revokeObjectURL(url)
        })
        .catch(err => console.error(err));

})