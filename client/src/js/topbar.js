// get the file name from the url
function getFileName() {
    const url = window.location.href;
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
}

document.querySelector(`a[href='/${getFileName()}']`).classList.add("active");