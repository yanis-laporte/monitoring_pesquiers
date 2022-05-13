<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

/**
 * Requête GET
 * Retourne la liste des capteurs
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $i = 0;
    $req = $bdd->query('SELECT * FROM listSensors');
    while ($req_f = $req->fetch(PDO::FETCH_ASSOC)) {
        foreach ($req_f as $key => $value) {
            $res[$i][$key] = $value;
        }
        $i++;
    }

    // Réponse
    res($res);
}

/**
 * Requête POST
 * Ajoute un nouveau capteur
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();

    // Vérifie si les bonnes données sont envoyées
    try {
        issetArray($_POST, ['sensor_id', 'name', 'unit', 'symbol']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    $req = $bdd->prepare('INSERT INTO listSensors (sensor_id, name, unit, symbol) VALUES (:sensor_id, :name, :unit, :symbol)');
    $req->execute(array(
        "sensor_id" => $_POST['sensor_id'],
        "name" => $_POST['name'],
        "unit" => $_POST['unit'],
        "symbol" => $_POST['symbol']
    ));

    // Réponse
    res($req->errorInfo());
}
