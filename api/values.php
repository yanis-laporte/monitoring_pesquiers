<?php

include('../includes/database_conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $balise_id = $_POST['balise_id'];
    $sensor_id = 1;
    $value = $_POST['temp'];

    $req = $bdd->prepare('INSERT INTO sensorsValues (balise_id, sensor_id, value) VALUES (:balise_id, :sensor_id, :value)');
    $req->execute(array(
        "balise_id" => $balise_id,
        "sensor_id" => $sensor_id,
        "value" => $value
    ));

    header('Content-Type: application/json');
    echo json_encode(array("errorInfo" => $req->errorInfo()));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM sensorsValues');
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
