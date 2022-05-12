- [ ] Mettre au clair la base de donnée
		alerts
			supprimer template
			supprimer email
		listeBalise
			battery ?
		sensorsCalbr -> Drop table
		sensorsValues
			balise_id -> tinytext -> tinyint
			balise_id utile ?
		users
			email -> username
			isAdmin -> utilité
- [ ] Mettre a jour l'api avec le function res
- [ ] Faire en sorte de vérifier le type et le format des donnée reçus
- [ ] Endpoint api pour mettre à jour le niveau de battery d'une balise
- [ ] Faire le choix de timerange des graphs
- [ ] Finir la nav bar
- [ ] Export CSV
- [ ] Faire le système de connexion
- [ ] Fetch avec le token du cookie php pour pas à implémenter l'html dans php
- [ ] Alertes
- [ ] Graphique
- [ ] Carte

Tout poffiner
Faire l'ajout de balises capteurs

### api
- POST Balise 
	- [ ] ajouter balise_id 
-  Tout les endpoinrs
	- [ ] Vérifier les données envoyer, type etc..
	- [ ] Handles les erreurs


### Connexion
- [ ] Responsive
- [ ] Système connexion
- [ ] Mot de passe oubliée
- [ ] Pas de compte

### Nav bar
- [ ] Finir le style
- [ ] Responsive
- [ ] Animation out de l'underline
- [ ] Javascript?
	
### Carte
- [x] Récupération points de la map
- [x] Ouverture lien (faire un truc) quand clique sur un point 
	- Ouverture sur une nouvelle tabs des données graphique de la balise
- [ ] (bonus) Ajout de balise directement depuis la map
- [ ] (bonus) Option d'affichage de la map


### Graphiques
- [ ] - https://www.highcharts.com/docs/stock/navigator
- [ ] Supprimer colonne balise_id de sensorsValues
- [ ] Graphique spécial pour le vent + direction
- [ ] Time range, affichage en ligne ou colonne
- [ ] navigator dans dans les graphiques
- [ ] option pour (afficher seulement 1 graphique avec + d'options ?)

### Alertes
- [ ] Style
	- [ ] Refaire animation bouton sauvegarde et suppression, scale down puis scale up comme bouton classique finalement
	- [ ] Responsive
		- [ ] Breakpoint 800px
	- [ ] Fix la text area
	- [ ] Rendre la partie gauche de la cards plus petite que la droite ~30/70% (Figma)
	- [ ] Refaire la cards https://puu.sh/IVGeq/9d602ed822.png
	- [ ] 
- [ ] Pouvoir modifier le nom de l'alerte + balise_id
- [ ] (bonus) Filtre les alertes
- [ ] Changer la localisation du cache
- [ ]  Check les données envoyé à php
- [ ] Vérification lors de la sauvegarde du succès de la requête avec le nouveau système
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