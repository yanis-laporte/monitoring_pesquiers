<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

/**
 * Gère les requêtes sur les balises
 * Méthode autorisé:
 * GET   : Récupère les balises
 *  @param int $balise_id L'id de la balise à récupérer
 * POST  : Créer une balise
 * 
 * @protected
 */

// Route protégée
protectedRoute();

/**
 * Requête GET
 * Retourne la lise des balises et les donnée associées
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Id spécifique
    if (isset($_GET['balise_id'])) {
        $req = $bdd->prepare('SELECT * FROM listBalise WHERE balise_id = :balise_id');
        $req->bindParam(":balise_id", $_GET['balise_id']);
        $req->execute();
        $res = $req->fetch(PDO::FETCH_ASSOC);
        //
    } else { // Toute les balises
        $req = $bdd->query('SELECT * FROM listBalise');

        $i = 0;
        while ($req_f = $req->fetch(PDO::FETCH_ASSOC)) {
            foreach ($req_f as $key => $value) {
                $res[$i][$key] = $value;
            }
            $i++;
        }
    }

    // Réponse
    res($res);
}

/**
 * Requête POST
 * Ajoute une nouvelle balise
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = jsonInput();

    // Vérifie si les bonnes données sont envoyées
    try {
        issetArray($_POST, ['balise_id', 'name', 'latitude', 'longitude', 'sensors_id']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    $req = $bdd->prepare('INSERT INTO listBalise (balise_id, name, latitude, longitude, sensors_id) VALUES (:balise_id, :name, :latitude, :longitude, :sensors_id)');
    $req->execute(array(
        "balise_id" => $_POST['balise_id'],
        "name" => $_POST['name'],
        "latitude" => $_POST['latitude'],
        "longitude" => $_POST['longitude'],
        "sensors_id" => $_POST['sensors_id']
    ));

    // Réponse
    res($req->errorInfo());
}
