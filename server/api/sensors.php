<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM listSensors');
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
    // echo "POST";
    $_POST = jsonInput();

    $req = $bdd->prepare('INSERT INTO listSensors (name, unit, symbol) VALUES (:name, :unit, :symbol)');
    $req->execute(array(
        "name" => $_POST['name'],
        "unit" => $_POST['unit'],
        "symbol" => $_POST['symbol']
    ));

    header('Content-Type: application/json');
    echo json_encode($req->errorInfo());
}
