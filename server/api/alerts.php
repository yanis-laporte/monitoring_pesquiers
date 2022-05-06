<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM alerts');
    while ($req_f = $req->fetch(PDO::FETCH_ASSOC)) {
        foreach ($req_f as $key => $value) {
            $data[$i][$key] = $value;
        }
        $i++;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();

    $req = $bdd->prepare('INSERT INTO alerts (name, template, balise_id, sensor_id, control, sign, email) VALUES (:name, :template, :balise_id, :sensor_id, :control, :sign, :email)');
    $req->execute(array(
        "name" => $_POST['name'],
        "template" => $_POST['template'],
        "balise_id" => $_POST['balise_id'],
        "sensor_id" => $_POST['sensor_id'],
        "control" => $_POST['control'],
        "sign" => $_POST['sign'],
        "email" => $_POST['email']
    ));

    header('Content-Type: application/json');
    echo json_encode(array(
        "errorInfo" => $req->errorInfo()
        /** , "data" => json_encode($_POST)**/
    ));
}

if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    $_PATCH = jsonInput();

    $req = $bdd->prepare('UPDATE alerts SET
        name = :name,
        template = :template,
        balise_id = :balise_id,
        sensor_id =  :sensor_id,
        control =  :control,
        sign =  :sign,
        email =  :email
        WHERE alert_id = :alert_id;');
    $req->execute(array(
        "alert_id" => $_PATCH['alert_id'],
        "name" => $_PATCH['name'],
        "template" => $_PATCH['template'],
        "balise_id" => $_PATCH['balise_id'],
        "sensor_id" => $_PATCH['sensor_id'],
        "control" => $_PATCH['control'],
        "sign" => $_PATCH['sign'],
        "email" => $_PATCH['email']
    ));

    header('Content-Type: application/json');
    echo json_encode(array("errorInfo" => $req->errorInfo()));
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $_DELETE = jsonInput();

    $req = $bdd->prepare('DELETE FROM alerts WHERE alert_id = :alert_id');
    $req->execute(array(
        "alert_id" => $_DELETE['alert_id']
    ));

    header('Content-Type: application/json');
    echo json_encode(array("errorInfo" => $req->errorInfo()));
}
