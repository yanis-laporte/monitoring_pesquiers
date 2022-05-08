 ```javascript
// fetch les nodes depuis le cache ou INTERNET
if (typeof window.cache.nodes[data.balise_id] == 'undefined') {
  balise = await fetchNode(data.balise_id)
  window.cache.nodes[data.balise_id] = balise
} else {
  balise = window.cache.nodes[data.balise_id]
}
 ```
 