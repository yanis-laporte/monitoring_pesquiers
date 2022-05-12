<?php

include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();
    $res = [];

    foreach ($_POST as $key => $value) {
        if (is_numeric($key)) {
            // echo json_encode(array(
            //     "post" => $_POST,
            //     "key" => $key,
            //     "value" => $value
            // ));

            $req = $bdd->prepare('INSERT INTO sensorsValues (balise_id, sensor_id, value) VALUES (:balise_id, :sensor_id, :value)');
            $req->execute(array(
                "balise_id" => $_POST['balise_id'],
                "sensor_id" => $key,
                "value" => $value
            ));

            $res[] = array(
                "errorInfo" => $req->errorInfo()
            );
        }
    }

    header('Content-Type: application/json');
    echo json_encode($res);
}

/**
 * Requête GET
 * Retourne les valeurs d'un capteur
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Contient la réponse de la requête
    $res = [];

    // Vérification présence de l'id
    if (!isset($_GET['id'])) {
        res(array(
            "msg" => "id manquant"
        ), 400);
    }

    // unitée de mesure
    if (isset($_GET['u']) && $_GET['u'] == "true") {
        $reqU = $bdd->prepare("SELECT name, unit, symbol FROM listSensors WHERE sensor_id = :sensor_id");
        $reqU->execute(array("sensor_id" => $_GET['id']));

        $res['params']['u'] = $reqU->fetchAll(PDO::FETCH_ASSOC)[0];
    }

    // Requête pour récupérer les valeurs des capteurs
    $sql = 'SELECT value, timestamp FROM sensorsValues WHERE sensor_id = :sensor_id';

    // intervalle de temps
    // from
    if (isset($_GET['from'])) {
        $res['params']['from'] = $_GET['from'];
        $sql .= ' AND timestamp > :from';
    }
    // to 
    if (isset($_GET['to'])) {
        $res['params']['to'] = $_GET['from'];
        $sql .= ' AND timestamp < :to';
    }

    //  Requête sql 
    $req = $bdd->prepare($sql);
    $req->bindValue('sensor_id', $_GET['id']);
    // Si 
    if (isset($_GET['from'])) $req->bindValue('from', $_GET['from']);
    if (isset($_GET['to'])) $req->bindValue('to', $_GET['to']);
    $req->execute();

    // Réponse
    $res['params']['id'] = $_GET['id'];
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
