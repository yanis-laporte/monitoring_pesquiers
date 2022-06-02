import { API_URL, $ } from './base';
import { Toast } from './toast';

const _toast = new Toast($('toast-container'))

// Gestion formulaire
document.querySelector('input[name=submit]').addEventListener('click', async (e) => {
    console.log(e);
    e.preventDefault();
    await fetch(`${API_URL}/user.php?login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('input[name=email]').value,
            password: document.querySelector('input[name=password]').value
        })
    }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            _toast.show('Authentification', data.message, data.success ? 'success' : 'danger')
            if (data.success == true) {
                setTimeout(() => { window.location.href = './map.html' }, 1000)
            }
        })
})

// Affichage du bouton déconnecter
fetch(`${API_URL}/user.php`, {
    method: 'GET',
    mode: 'cors'
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        data.success == true ? $('userMenu').classList.remove('hidden') : $('userMenu').classList.add('hidden')
    })