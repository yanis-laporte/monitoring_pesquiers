<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

session_start();

/**
 * Gestion de l'utilisateur
 * Méthode autorisé:
 * POST
 *  @query login   : Permet la connexion d'un utilisateur
 *  @query register: Permet la création d'un compte utilisateur
 * GET
 *  @query -       : Retourne si l'utilisateur est connecté ou non
 *  @query logout  : Déconnecte l'utilisateur
 */

/**
 * Requête POST
 * Gère l'authentification
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['login'])) {
    try {
        issetArray($_POST, ['email', 'password']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    $req = $bdd->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
    $req->execute(array(
        "email" => $_POST['email']
    ));

    $user = $req->fetch(PDO::FETCH_ASSOC);
    if (password_verify($_POST['password'], $user['password'])) {
        $_SESSION['isConnected'] = true;
        $_SESSION['user'] = $user;
        res(array(
            "success" => true,
            "message" => "Vous êtes connecté"
        ));
    } else {
        $_SESSION['isConnected'] = false;
        res(array(
            "success" => false,
            "message" => "Mauvais couple adresse mail/mot de passe"
        ), 401);
    }
}

/**
 * Requête POST
 * Création d'un compte
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['register'])) {
    try {
        issetArray($_POST, ['email', 'password']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    // Mot de passe hashé
    $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

    try {
        // Insertion dans la base de données
        $req = $bdd->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');
        $req->execute(array(
            "email" => $_POST['email'],
            "password" => $hash
        ));
        $result = $req->errorInfo();

        if ($result[0] == '0000') {
            // Compte crée avec succès
            $user = array(
                "isAdmin" => false,
                "email" => $_POST['email'],
                "password" => $hash
            );

            $_SESSION['isConnected'] = true;
            $_SESSION['user'] = $user;

            res(array(
                "success" => true,
                "message" => "Compte crée avec succès",
            ));
        } else {
            // Erreur
            res(array(
                "success" => false,
                "message" => $result
            ), 500);
        }
    } catch (Throwable $th) {
        // 23000 => Duplicate entry sur une clé unique
        if ($th->getCode() == 23000) {
            res(array(
                "error" => "Email déjà utilisé"
            ), 400);
        } else {
            res(array(
                "success" => false,
                "message" => $th->getMessage()
            ), 500);
        }
    }
}

/**
 * Requête POST
 * Déconnexion
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['logout'])) {
    session_destroy();
    res(array(
        "success" => true,
        "message" => "Vous êtes déconnecté"

    ));
}

/**
 * Requête GET
 * Vérifie si l'utilisateur est connecté
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_SESSION['isConnected']) && $_SESSION['isConnected']) {
        res(array(
            "success" => true,
            "message" => "Vous êtes connecté",
            "user" => $_SESSION['user']
        ));
    } else {
        res(array(
            "success" => false,
            "message" => "Vous n'êtes pas connecté"
        ), 401);
    }
}

exit();
