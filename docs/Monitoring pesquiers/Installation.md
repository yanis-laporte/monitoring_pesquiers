# Installation
`apt update`
`apt upgrade`

`apt install apache2 libapache2-mod-php7.4 mariadb-server mariadb-client`

`apt install phpmyadmin`

Cocher apache2 a l'aide de la barre espace

![[pma_web_server.png]]

Répondre Oui à la question 'Configurer une base de données pour phpymadmin avec dbconfig-common '
![[pma_dbconfig_common.png]]

Ne mettre de mot de passe (laisser vide)

Se connecter au tant que root à la base de donnée
`sudo mysql -u root`
Entrer
`CREATE USER 'pesquiers'@'localhost' IDENTIFIED by 'motdepasse';`
`GRANT ALL PRIVILEGES ON *.* TO USER pesquiers;`
`FLUSH PRIVILEGES;`
puis `exit;`

Dans phpmyadmin crée une nouvelle base de donnée nommée
`monitoring_pesquiers`
Cliquer sur l'onglet `Importer`
Importer le fichier `database_schema.sql`
Puis executer

## Téléverser le code

Exectuer la commande `npm run build` dans le dossier `client`
Puis importer le contenu du dossier `dist` dans `/var/www/html` sur le Raspberry Pi
Editer le fichier `server/includes/database_conn.php`
Et changer le nom d'utilisateur et le mot de passe entrer précedemment
```php
$bdd = new PDO('mysql:host=localhost;dbname=monitoring_pesquiers;charset=utf8', 'username', 'motdepasse');
```
Puis importer les dossiers `api` et `includes` de `server` vers `/var/www/html` sur le Raspberry Pi
De façon a avoir une architecture ressemblant à 
![[architecture.png]]


## Ajouter des balises
Pour ajouter des balises et des capteurs, ils suffit d'ajouter des lignes des la tables `listBalise` et `listSensors`

# Commande pour extraire seulement le schéma des de la database

mysqldump -u `username` -p -h `hostname` --no-data=TRUE `db_name` > dump.sql
