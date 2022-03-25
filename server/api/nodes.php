<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM listBalise');
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

    $req = $bdd->prepare('INSERT INTO listBalise (name, latitude, longitude, sensors_id) VALUES (:name, :latitude, :longitude, :sensors_id)');
    $req->execute(array(
        "name" => $_POST['name'],
        "latitude" => $_POST['latitude'],
        "longitude" => $_POST['longitude'],
        "sensors_id" => $_POST['sensors_id']
    ));

    header('Content-Type: application/json');
    echo json_encode($req->errorInfo());
}
