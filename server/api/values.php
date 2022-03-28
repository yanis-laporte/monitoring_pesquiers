<?php

include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();

    $req = $bdd->prepare('INSERT INTO sensorsValues (balise_id, sensor_id, value) VALUES (:balise_id, :sensor_id, :value)');
    $req->execute(array(
        "balise_id" => $_POST['balise_id'],
        "sensor_id" => $_POST['sensor_id'],
        "value" => $_POST['value']
    ));

    header('Content-Type: application/json');
    echo json_encode(array("errorInfo" => $req->errorInfo()));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($_GET && $_GET['u'] == true) {

        $req = $bdd->query(
            'SELECT
                v.id,v.balise_id,v.sensor_id, 
                (CEIL((v.value + (SELECT calbr_rect from sensorsCalbr where sensor_id = v.sensor_id limit 1)) * 100)/100) AS value,
                v.timestamp, s.name, s.unite, s.symbole
            FROM sensorsValues v
            LEFT JOIN listSensors s
            ON v.sensor_id=s.sensor_id'
        );

        $i = 0;
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
    } else {
        $req = $bdd->query('SELECT * FROM sensorsValues');

        $i = 0;
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
}
