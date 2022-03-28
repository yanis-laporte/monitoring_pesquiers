<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM sensorsCalbr');
    while ($req_f = $req->fetch()) {
        foreach ($req_f as $key => $value) {
            if (!is_numeric($key)) {
                $data[$i][$key] = $value;
            }
        }
        $i++;
    }
    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // echo "POST";
    $_POST = jsonInput();

    $req = $bdd->prepare('INSERT INTO sensorsCalbr (balise_id, sensor_id, calbr_rect) VALUES (:balise_id, :sensor_id, :calbr_rect)');
    $req->execute(array(
        "balise_id" => $_POST['balise_id'],
        "sensor_id" => $_POST['sensor_id'],
        "calbr_rect" => $_POST['calbr_rect']
    ));

    header('Content-Type: application/json');
    echo json_encode($req->errorInfo());
}
