<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

/**
 * Requête GET
 * Retourne la liste des alertes
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $i = 0;
    $req = $bdd->query('SELECT * FROM alerts');
    while ($req_f = $req->fetch(PDO::FETCH_ASSOC)) {
        foreach ($req_f as $key => $value) {
            $res[$i][$key] = $value;
        }
        $i++;
    }

    if ($req->errorInfo()[0] == "00000") {
        res($res);
    } else {
        res($req->errorInfo(), 500);
    }
}

/**
 * Requête POST
 * Ajoute une nouvelle alerte
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();

    // Vérifie si les bonne données sont envoyées
    try {
        issetArray($_POST, ['name', 'balise_id', 'sensor_id', 'control', 'sign', 'email']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    $req = $bdd->prepare('INSERT INTO alerts (name, balise_id, sensor_id, control, sign, email) VALUES (:name, :balise_id, :sensor_id, :control, :sign, :email)');
    $req->execute(array(
        "name" => $_POST['name'],
        "balise_id" => $_POST['balise_id'],
        "sensor_id" => $_POST['sensor_id'],
        "control" => $_POST['control'],
        "sign" => $_POST['sign'],
        "email" => $_POST['email']
    ));

    if ($req->errorInfo()[0] == "00000") {
        res($req->errorInfo());
    } else {
        res($req->errorInfo(), 500);
    }
}

/**
 * Requête PATCH
 * Modifie une alerte
 */
if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    $_PATCH = jsonInput();

    // Vérifie si les bonne données sont envoyées
    try {
        issetArray($_PATCH, ['name', 'balise_id', 'sensor_id', 'control', 'sign', 'email', 'alert_id']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }


    $req = $bdd->prepare('UPDATE alerts SET
        name = :name,
        balise_id = :balise_id,
        sensor_id =  :sensor_id,
        control =  :control,
        sign =  :sign,
        email =  :email
        WHERE alert_id = :alert_id;');
    $req->execute(array(
        "alert_id" => $_PATCH['alert_id'],
        "name" => $_PATCH['name'],
        "balise_id" => $_PATCH['balise_id'],
        "sensor_id" => $_PATCH['sensor_id'],
        "control" => $_PATCH['control'],
        "sign" => $_PATCH['sign'],
        "email" => $_PATCH['email']
    ));

    if ($req->errorInfo()[0] == "00000") {
        res(array("success" => "L'alerte été modifiée avec succès"));
    } else {
        res(array("error" => "Une erreur est survenue lors de la sauvegarde de l'alerte", $req->errorInfo()), 500);
    }
}

/**
 * Requête DELETE
 * Supprime une alerte
 */
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $_DELETE = jsonInput();

    // Vérifie si les bonne données sont envoyées
    try {
        issetArray($_DELETE, ['alert_id']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }


    $req = $bdd->prepare('DELETE FROM alerts WHERE alert_id = :alert_id');
    $req->execute(array(
        "alert_id" => $_DELETE['alert_id']
    ));

    if ($req->errorInfo()[0] == "00000") {
        res($req->errorInfo());
    } else {
        res($req->errorInfo(), 500);
    }
}
