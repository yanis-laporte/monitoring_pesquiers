<?php
include('../includes/database_conn.php');

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
    $i = 0;
    // $req = $bdd->query('SELECT * FROM listBalise');
    // while ($req_f = $req->fetch()) {
    //     foreach ($req_f as $key => $value) {
    //         if (!is_numeric($key)) {
    //             $data[$i][$key] = $value;
    //         }
    //     }
    //     $i++;
    // }
    header('Content-Type: application/json');
    echo json_encode($data);
}
