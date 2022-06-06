<?php

include('../includes/database_conn.php');
include('../includes/functions.php');

/**
 * Gère les requêtes sur les valeurs
 * Méthode autorisé:
 * GET   : Récupère les valeurs
 *  @param bool $u Ajoute les unités a la réponse
 *  @param string $from Timestamp de début d'intervalle
 *  @param string $to TimeStamp de fin d'intervalle
 *  @param int $sensor_id id du capteur
 *  @param int $balise_id id de la balise
 *  @protected
 * 
 * POST  : Ajoute une valeur a la vase de données
 * 
 */

// Seulement la route GET est protégée
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    protectedRoute();
}

/**
 * Requête POST
 * Insert une nouvelle entrée dans la base de donnée
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Lecture des données POST
    $_POST = jsonInput();

    // Vérifie si les bonnes données sont envoyées
    try {
        issetArray($_POST, ['balise_id']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    // Réponse
    $res = [];

    // Retire \n \r des données fournis
    $_POST['balise_id'] = explode("|", str_replace(array("\n", "\r"), '|', $_POST['balise_id']))[0];

    foreach ($_POST as $key => $value) {
        // DEBUG
        // echo json_encode(array(
        //     "post" => $_POST,
        //     "key" => $key,
        //     "value" => $value
        // ));


        // Batterie
        if ($key == "b") {
            $req = $bdd->prepare('UPDATE listBalise SET battery_level = :btlvl WHERE balise_id = :balise_id');
            $req->execute(array(
                "btlvl" => $_POST['b'],
                "balise_id" => $_POST['balise_id'],
            ));
        }

        // Grandeurs
        if (is_numeric($key)) {
            $req = $bdd->prepare('INSERT INTO sensorsValues (balise_id, sensor_id, value) VALUES (:balise_id, :sensor_id, :value)');
            $req->execute(array(
                "balise_id" => $_POST['balise_id'],
                "sensor_id" => $key,
                "value" => $value
            ));
        }
    }

    // Réponse
    res($req->errorInfo());
}

/**
 * Requête GET
 * Retourne les valeurs d'un capteur
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Contient la réponse de la requête
    $res = [];

    // Vérifie si les bonne données sont envoyées
    try {
        issetArray($_GET, ['sensor_id', 'balise_id']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    // unités de mesure
    if (isset($_GET['u']) && $_GET['u'] == "true") {
        $reqU = $bdd->prepare("SELECT name, unit, symbol FROM listSensors WHERE sensor_id = :sensor_id");
        $reqU->execute(array("sensor_id" => $_GET['sensor_id']));

        $res['params']['u'] = $reqU->fetchAll(PDO::FETCH_ASSOC)[0];
    }

    // Requête pour récupérer les valeurs des capteurs
    $sql = 'SELECT value, timestamp FROM sensorsValues WHERE sensor_id = :sensor_id AND balise_id = :balise_id';

    // intervalle de temps
    // from
    if (isset($_GET['from'])) {
        $res['params']['from'] = $_GET['from'];
        $sql .= ' AND timestamp > :from';
    }
    // to 
    if (isset($_GET['to'])) {
        $res['params']['to'] = $_GET['to'];
        $sql .= ' AND timestamp < :to';
    }

    //  Requête sql 
    $req = $bdd->prepare($sql);
    $req->bindValue('sensor_id', $_GET['sensor_id']);
    $req->bindValue('balise_id', $_GET['balise_id']);
    // Si 
    if (isset($_GET['from'])) $req->bindValue('from', $_GET['from']);
    if (isset($_GET['to'])) $req->bindValue('to', $_GET['to']);
    $req->execute();

    // Réponse
    $res['params']['s_id'] = $_GET['sensor_id'];
    $res['params']['b_id'] = $_GET['balise_id'];
    $res['values'] = [];

    $i = 0;
    while ($req_f = $req->fetch(PDO::FETCH_ASSOC)) {
        foreach ($req_f as $key => $value) {
            $res['values'][$i][$key] = $value;
        }
        $i++;
    }

    // Réponse
    res($res);
}
