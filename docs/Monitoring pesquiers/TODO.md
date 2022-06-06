## Feuille de route 
- [x] Mettre a jour l'api avec le function res
- [x] Faire en sorte de vérifier le type et le format des donnée reçus
- [x] Endpoint api pour mettre à jour le niveau de battery d'une balise
- [x] Faire le choix de timerange des graphs
	- [x] Choix avec des inputs calendar
	- [ ] Choix rapide 5min 10min 1heure etc
	- [x] Animation tourne quand id=redrawBtn a class change
- [x] Finir la nav bar
- [x] Export CSV
- [x] Faire le système de connexion
	- @alerts, @nodes, @sensors, GET values
- [ ] Alertes
- [ ] Graphique
- [ ] Carte

### Connexion
- [ ] Responsive
- [ ] Mot de passe oubliée
- [ ] Pas de compte
- [x] Système connexion

### Nav bar
- [x] Finir le style
- [x] Responsive
- [x] Javascript?
	
### Carte
- [ ] https://cdnjs.com/libraries/leaflet
- [ ] (bonus) Ajout de balise directement depuis la map
- [ ] (bonus) Option d'affichage de la map
- [x] Récupération points de la map
- [x] Ouverture lien (faire un truc) quand clique sur un point 
	- Ouverture sur une nouvelle tabs des données graphique de la balise



### Graphiques
- [ ] Affichange ligne, colonne
- [x] Supprimer colonne balise_id de sensorsValues
- [x] Time range


### Alertes
- [ ] Style
	- [ ] Responsive
		- [ ] Breakpoint 800px
	- [x] Refaire animation bouton sauvegarde et suppression, scale down puis scale up comme bouton classique finalement
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
- [x] Page
- [x] Style
- [x] Option d'export
	- [Export](Export)
- [x] Translation des keys

## Toast
- [ ] Responsive -> toast en milieu  haut de l'écran
- [ ] Quand pas de titre, affichier le toast juste sur une ligne
- [x] Fonctionnel


Breakpoint sass
http://breakpoint-sass.com/
https://jsdoc.app/index.html
