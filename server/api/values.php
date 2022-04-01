<?php

include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();
    var_dump($_POST);

    $data;
    $i = 0;
    foreach ($_POST as $key => $value) {
        // if (!is_numeric($key)) {
        $data[$i][$key] = $value;
        // }
    }
    $i++;

    var_dump(json_encode($data));

    // $req = $bdd->prepare('SELECT * FROM listBalise WHERE balise_id = :balise_id');
    // $req->execute(array(
    //     "balise_id" => $_POST['balise_id']
    // ));

    // $data;
    // $i = 0;
    // while ($req_f = $req->fetch()) {
    //     foreach ($req_f as $key => $value) {
    //         if (!is_numeric($key)) {
    //             if ($key == 'sensors_id') {
    //                 $data[$i][$key] = explode(',', $value);
    //             } else {
    //                 $data[$i][$key] = $value;
    //             }
    //         }
    //     }
    //     $i++;
    // }
    // var_dump($data);

    // $req = $bdd->prepare('SELECT * FROM listSensors WHERE sensors_id = :sensors_id AND ');

    // $req = $bdd->prepare('SELECT * FROM listSensors WHERE name LIKE "%:name%"')
    // $req->execute(array(
    //     "name" => 
    // ))

    // $req = $bdd->prepare('INSERT INTO sensorsValues (balise_id, sensor_id, value) VALUES (:balise_id, SELECT * FROM listSensors WHERE name LIKE "%:name%"', :value)');
    // $req->execute(array(
    //     "balise_id" => $_POST['balise_id'],
    //     "name" => "te,
    //     "value" => $_POST['value']
    // ));

    header('Content-Type: application/json');
    // echo json_encode(array("errorInfo" => $req->errorInfo()));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($_GET && $_GET['u'] == true) {

        $req = $bdd->prepare(
            'SELECT
                v.id,v.balise_id,v.sensor_id, 
                (CEIL((v.value + (SELECT calbr_rect from sensorsCalbr where sensor_id = v.sensor_id limit 1)) * 100)/100) AS value,
                v.timestamp, s.name, s.unite, s.symbole
            FROM sensorsValues v
            LEFT JOIN listSensors s
            ON v.sensor_id=s.sensor_id WHERE v.sensor_id = :sensor_id '
        );
        $req->execute(array(
            "sensor_id" => $_GET['id']
        ));

        $data;
        $i = 0;
        while ($req_f = $req->fetch()) {
            foreach ($req_f as $key => $value) {
                if (!is_numeric($key)) {
                    $data[$i][$key] = $value;
                }
            }
            $i++;
        }

        cors();
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

        cors();
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
