- [x] Mettre a jour l'api avec le function res
- [x] Faire en sorte de vérifier le type et le format des donnée reçus
- [x] Endpoint api pour mettre à jour le niveau de battery d'une balise
- [ ] Faire le choix de timerange des graphs
	- [x] Choix avec des inputs calendar
	- [ ] Choix rapide 5min 10min 1heure etc
	- [x] Animation tourne quand id=redrawBtn a class change
- [x] Finir la nav bar
- [ ] Export CSV
- [ ] Faire le système de connexion
- [ ] Fetch avec le token du cookie php pour pas à implémenter l'html dans php
- [ ] Alertes
- [ ] Graphique
- [ ] Carte

### api
-  Tout les endpoinrs
	- [ ] Handles les erreurs


### Connexion
- [ ] Responsive
- [ ] Système connexion
- [ ] Mot de passe oubliée
- [ ] Pas de compte

### Nav bar
- [x] Finir le style
- [x] Responsive
- [x] Javascript?
	
### Carte
- [x] Récupération points de la map
- [x] Ouverture lien (faire un truc) quand clique sur un point 
	- Ouverture sur une nouvelle tabs des données graphique de la balise
- [ ] (bonus) Ajout de balise directement depuis la map
- [ ] (bonus) Option d'affichage de la map


### Graphiques
- [x] Supprimer colonne balise_id de sensorsValues
- [ ] Graphique spécial pour le vent + direction
- [ ] Affichange ligne, colonne
- [x] Time range


### Alertes
- [ ] Style
	- [x] Refaire animation bouton sauvegarde et suppression, scale down puis scale up comme bouton classique finalement
	- [ ] Responsive
		- [ ] Breakpoint 800px
	- [x] Rendre la partie gauche de la cards plus petite que la droite ~30/70% (Figma)
	- [x] Refaire la cards https://puu.sh/IVGeq/9d602ed822.png
- [ ] Indication quand changement non effectuer ~
- [ ] (bonus) Filtre les alertes
- [x] Pouvoir modifier le ~~nom de l'alerte~~ + balise_id

- [x] Changer la localisation du cache  window.cache  -> window.pCache
- [x]  Check les données envoyé à php
- [x] Vérification lors de la sauvegarde du succès de la requête avec le nouveau système
- [x] Throw une erreur quand le fetch ne reçoit pas de réponse
	- Affiche un toast d'erreur lors de l'échec de la
		- récupération des alertes
		- sauvegarde/création d'une alerte
		- suppresion d'une alerts
- [x] Recupération des alertes
- [x] Sauvegarder
	- [x] Modification
	- [x] Création
		Requête post au lieu de patch lors de la sauvegarde
- [x] Affichage
- [x] Supprésion
- [x] Fixer la glass


### Export CSV
- [ ] Page
- [ ] Style
- [ ] Option d'export
	- [ ] Balise
	- [ ] Capteur
	- [ ] Nombre de ligne
	- [ ] Séparateur
	- [ ] ?
- [ ] API ou direct sur php ?

### Ajout/Modification de Balises
### Ajout/Modification de Capteurs

### Global
- [x] Toast
- [ ] mode:'cors' des fetchs ?

## Toast
- [x] Fonctionnel
- [ ] Responsive -> toast en milieu  haut de l'écran
- [ ] Quand pas de titre, affichier le toast juste sur une ligne


Breakpoint sass
http://breakpoint-sass.com/
https://jsdoc.app/index.html

Frosted glass:

https://www.reddit.com/r/webdev/comments/u5m4ue/frosted_class_effect_in_css_one_of_my_favorites/

### Charts

[tmp code](obsidian://open?vault=Monitoring%20pesquiers&file=tmp)
	
https://www.highcharts.com/demo/windbarb-series
https://www.highcharts.com/demo/combo-meteogram#https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.50853&lon=-0.12574&altitude=25
https://jsfiddle.net/hn8sgw5y/23/
https://www.highcharts.com/docs/stock/navigator
https://www.tutlane.com/tutorial/highcharts/highcharts-multiple-axes-chart
scrollbar
https://jsfiddle.net/0tgyqqkj/
https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/line-time-series

- [ ] https://cdnjs.com/libraries/leaflet