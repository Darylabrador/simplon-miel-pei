<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mot de passe oublié</title>
</head>
<body>
    <p> 
        Bonjour {{ $identity }}, <br>
        Vous avez oublié votre mot de passe ? Ne vous inquiétez pas, pour réinitialiser il vous suffit 
        de cliquer sur le lien ci-dessous : <br>
    </p>

    <a href="{{ $resetUrl }}"> {{ $resetUrl }} </a>

    <p> 
        Cordialement, <br>
        L'équipe de Miel Péi
    </p>
</body>
</html>