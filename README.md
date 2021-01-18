# Projet market place "Miel Péi" 

La conception et le développement de ce projet s'est effectué dans le cadre de la formation de Simplon. 

J'utilise ici : 

- FRONTEND : Blade et Javascript
- BACKEND  : Laravel v8

Une seconde version sera mise en place suivant :

- FRONTEND : VueJS
- BACKEND  : Laravel v8

## Compte de test :

Identifiant admin : 
- login : admin@gmail.com
- mot de passe : password

Identifiant d'un client :
- login : client@gmail.com
- mot de passe : password

Identifiant d'un producteur
- login : producteur@gmail.com
- mot de passe : password

## Initialisation du projet

Après avoir fait un git clone de ce projet, vous devez effectué les actions suivantes : 

- composer install
- npm install

## Contenu du .env

Vous devez éditer les informations suivantes dans votre .env :

Les valeurs des variables DB_ dépendent de votre environnement.

- DB_DATABASE=miel_peii
- DB_USERNAME=root
- DB_PASSWORD=
- QUEUE_CONNECTION=database

Pour la suite, vous devez avoir un compte mailtrap ou utiliser des informations d'un compte email réel :

- MAIL_MAILER=smtp
- MAIL_HOST=smtp.mailtrap.io
- MAIL_PORT=2525
- MAIL_USERNAME=
- MAIL_PASSWORD=
- MAIL_ENCRYPTION=
- MAIL_FROM_ADDRESS=contact@mielpei.com

## Lancement du projet 

En mode développment vous devez utiliser les commandes suivantes : 

- php artisan serve
- php artisan queue:work (lancement des tâches de fond - jobs)
- npm run watch (compilation des fichiers SASS)

En mode production la commande suivante doit être actif en permanence :

- php artisan queue:work