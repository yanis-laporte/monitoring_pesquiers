// Récupère le nom de la page courante via l'url
function getFileName() {
    const url = window.location.href.split('/');
    return url[url.length - 1];
}

document.querySelector(`a[href='${getFileName()}']`).classList.add("active");