<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // echo "GET";
    $i = 0;
    $req = $bdd->query('SELECT * FROM listSensors');
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

    $req = $bdd->prepare('INSERT INTO listSensors (name, unite, symbole) VALUES (:name, :unite, :symbole)');
    $req->execute(array(
        "name" => $_POST['name'],
        "unite" => $_POST['unite'],
        "symbole" => $_POST['symbole']
    ));

    header('Content-Type: application/json');
    echo json_encode($req->errorInfo());
}
