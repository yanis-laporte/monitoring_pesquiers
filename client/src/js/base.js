module.exports = {
    // API_URL: "http://127.0.0.1/edsa-pesquiers/api"
    // API_URL: "http://localhost/api",
    API_URL: "http://192.168.0.120/api",

    /* A function that returns the element with the id passed as parameter. */
    $: (e) => {
        return document.getElementById(e)
    },
    /* A function that returns the elements with the name passed as parameter. */
    $$: (e) => {
        return document.getElementsByName(e)
    }
}