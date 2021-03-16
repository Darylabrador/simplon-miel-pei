<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notification connexion</title>
</head>
<body>
        <p> 
        Bonjour {{ $identity }}, <br>
        Vous vous êtes connecté depuis l'adresse IP {{ $remoteip }} le {{ $datenow }}<br>
    </p>

    <p> 
        Cordialement, <br>
        L'équipe de Miel Péi
    </p>
</body>
</html>