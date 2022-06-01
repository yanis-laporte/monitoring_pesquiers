module.exports = {
    API_URL: "./api",

    /* Retourne l'element associé avec l'id en paramètre */
    $: (e) => {
        return document.getElementById(e)
    },
    /* Retourne les éléments associé avec le nom en paramètre */
    $$: (e) => {
        return document.getElementsByName(e)
    },

    /* Fonction ForEach asynchrone */
    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}