import { API_URL, $ } from './base';
import { Toast } from './toast';

const _toast = new Toast($('toast-container'))

showForm(window.location.hash)
showUserMenu()

/**
 * Update le formulaire de connexion en quand le hash de la page change
 */
window.addEventListener("hashchange", e => {
    showForm(window.location.hash)
});

/**
 * Bouton déconnexion
 */
$('logout').addEventListener('click', e => {
    fetch(`${API_URL}/user.php?logout`, {
        method: 'GET',
        mode: 'cors',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            _toast.show('Authentification', data.message, data.success ? 'success' : 'danger')
            $('userMenu').classList.add('hidden')
        })
});

/**
 * Formulaire soumis
 */
document.querySelector('form').addEventListener('submit', async (e) => {
  const composedPath = e.composedPath();
  const formId = $(composedPath.find((e) => e.nodeName == 'FORM').id);

  switch (composedPath.find((e) => e.nodeName == 'FORM').id) {
});

/**
 * Affiche le menu de déconnexion si l'utilisateur est connecté
 */
function showUserMenu() {
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
}

/**
 * Change le formulaire suivant le hash de la page (#register ou *)
 * @param {String} hash 
 */
function showForm(hash) {
    if (hash === '#register') {
        document.querySelector('form').setAttribute('name', 'regForm')
        document.querySelector('form').setAttribute('id', 'regForm')

        document.querySelector('div.title').innerHTML = 'S\'inscrire'
        document.querySelector('.tooltip').querySelector('a').href = '#login'
        document.querySelector('.tooltip').querySelector('a').innerHTML = 'Déjà un compte ? Se connecter'
    } else {
        document.querySelector('form').setAttribute('name', 'logForm')
        document.querySelector('form').setAttribute('id', 'logForm')

        document.querySelector('div.title').innerHTML = 'Connexion'
        document.querySelector('.tooltip').querySelector('a').href = '#register'
        document.querySelector('.tooltip').querySelector('a').innerHTML = 'Pas de compte ? Créer en un'
    }
}