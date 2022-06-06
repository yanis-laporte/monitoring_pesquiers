<?php
include('../includes/database_conn.php');
include('../includes/functions.php');

/**
 * Gère les requêtes d'exportation
 * Méthode autorisé:
 * GET
 *  @param string $type Type de données à exporter
 * ...
 * 
 * @protected
 */

// Route protégée
protectedRoute();

/**
 * Requête GET
 * Retourne un fichier csv
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        issetArray($_GET, ['type']);
    } catch (\Throwable $th) {
        res(array(
            "error" => $th->getMessage()
        ), 400);
    }

    header('Content-Type: text/csv');

    switch ($_GET['type']) {
        case 'values':
            echo ArrayToCSV(exportValues($_GET, $bdd));
            break;
        case 'sensors':
            echo ArrayToCSV(exportSensors($_GET, $bdd));
            break;
        case 'nodes':
            echo ArrayToCSV(exportNodes($_GET, $bdd));
            break;
        case 'alerts':
            echo ArrayToCSV(exportAlerts($_GET, $bdd));
            break;

        default:
            res(array(
                "error" => "Type de données inconnu"
            ), 400);
            break;
    }
    // Fin du script
    exit();
}

/**
 * Convertis un tableau en csv
 * @param array $arr Tableau à convertir
 * @return string CSV
 */
function ArrayToCSV($arr) {
    function getTranslation($key) {
        $nameTranslation = array(
            "id" => "ID",
            "balise_id" => "Balise ID",
            "sensor_id" => "Capteur ID",
            "value" => "Valeur",
            "timestamp" => "Horodatage",
            "name" => "Nom",
            "unit" => "Unité",
            "symbol" => "Symbole",

            "latitude" => "Latitude",
            "longitude" => "Longitude",
            "sensors_id" => "Capteur ID",
            "battery_level" => "Niveau de batterie",
            "alert_id" => "ID de l'alerte",
            "control" => "Valeur de contrôle",
            "sign" => "Signe",
        );
        if (isset($nameTranslation[$key])) {
            return $nameTranslation[$key];
        } else {
            return $key;
        }
    }

    $csv = "";
    // header du csv -> clé de $arr
    for ($i = 0; $i < count($arr[0]); $i++) {
        $csv .= getTranslation(key($arr[0])) . ";";
        next($arr[0]);
    }
    $csv .= "\n";

    // remplissage du csv -> valeur de $arr
    foreach ($arr as $row) {
        foreach ($row as $key => $value) {
            $csv .= $value . ";";
        }
        $csv .= "\n";
    }

    return $csv;
}

/**
 * Récupère les données des capteurs en fonction de paramètres $query
 * @param array $query Paramètres de la requête
 * @param PDO $bdd Connexion à la base de données
 * @return array Tableau des données
 * 
 */
function exportSensors($query, $bdd) {
    $sql = "SELECT * FROM listSensors WHERE 1=1";

    // Confection de la requête
    if (isset($query['sensor_id'])) { // int
        $sql .= " AND sensor_id = :sensor_id";
    }
    if (isset($query['sort'])) { // asc || desc
        $sql .= " ORDER BY " . whitelist($query['sby'], ['sensor_id', 'name', 'unit', 'symbol']) . " " . whitelist($query['sort'], ['asc', 'desc']);
    }
    if (isset($query['limit'])) { // int
        $sql .= " LIMIT :limit";
    }

    $req = $bdd->prepare($sql);

    // Variable
    if (isset($query['sensor_id'])) { // int
        $req->bindValue('sensor_id', $query['sensor_id']);
    }
    if (isset($query['limit'])) { // int
        $req->bindValue('limit', $query['limit'], PDO::PARAM_INT);
    }

    $req->execute();
    return $req->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Récupère les valeurs en fonction de paramètres $query
 * @param array $query
 * @param PDO $bdd
 * @return array
 */
function exportValues($query, $bdd) {
    $sql = "SELECT * FROM sensorsValues v ";

    // Confection de la requête
    if (isset($query['u']) && $query['u'] == 'true') { // true || false
        $sql .= " LEFT JOIN listSensors s ON v.sensor_id=s.sensor_id";
    }

    $sql .= " WHERE 1=1";

    if (isset($query['balise_id'])) { // int
        $sql .= " AND v.balise_id = :balise_id";
    }
    if (isset($query['sensor_id'])) { // int
        $sql .= " AND v.sensor_id = :sensor_id";
    }
    if (isset($query['from'])) { // timestamp
        $sql .= " AND v.timestamp > :from";
    }
    if (isset($query['to'])) { // timestamp
        $sql .= " AND v.timestamp < :to";
    }
    if (isset($query['sort'])) { // asc || desc
        $sql .= " ORDER BY v." . whitelist($query['sby'], ['id', 'balise_id', 'sensor_id', 'value', 'timestamp']) . " " . whitelist($query['sort'], ['asc', 'desc']);
    }
    if (isset($query['limit'])) { // int
        $sql .= " LIMIT :limit";
    }

    $req = $bdd->prepare($sql);

    // Variable
    if (isset($query['balise_id'])) { // int
        $req->bindValue('balise_id', $query['balise_id']);
    }
    if (isset($query['sensor_id'])) { // int
        $req->bindValue('sensor_id', $query['sensor_id']);
    }
    if (isset($query['from'])) { // timestamp
        $req->bindValue('from', $query['from']);
    }
    if (isset($query['to'])) { // timestamp
        $req->bindValue('to', $query['to']);
    }
    if (isset($query['limit'])) { // int
        $req->bindValue('limit', $query['limit'], PDO::PARAM_INT);
    }

    $req->execute();
    return $req->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Récupère les valeurs en fonction de paramètres $query
 * @param array $query
 * @param PDO $bdd
 * @return array
 */
function exportNodes($query, $bdd) {
    $sql = "SELECT * FROM listBalise WHERE 1=1";

    if (isset($query['balise_id'])) { // int
        $sql .= " AND balise_id = :balise_id";
    }
    if (isset($query['sensors_id'])) { // string
        $sql .= " AND sensors_id LIKE CONCAT('%', :sensors_id, '%')";
    }
    if (isset($query['battery_level'])) { // int
        $sql .= " AND battery_level = :battery_level";
    }
    if (isset($query['sort'])) { // asc || desc
        $sql .= " ORDER BY " . whitelist($query['sby'], ['balise_id', 'name', 'latitude', 'longitude', 'sensors_id', 'battery_level']) . " " . whitelist($query['sort'], ['asc', 'desc']);
    }
    if (isset($query['limit'])) { // int
        $sql .= " LIMIT :limit";
    }

    $req = $bdd->prepare($sql);

    if (isset($query['balise_id'])) { // int
        $req->bindValue('balise_id', $query['balise_id']);
    }
    if (isset($query['sensors_id'])) { // string
        $req->bindValue('sensors_id', $query['sensors_id']);
    }
    if (isset($query['battery_level'])) { // int
        $req->bindValue('battery_level', $query['battery_level']);
    }
    if (isset($query['limit'])) { // int
        $req->bindValue('limit', $query['limit'], PDO::PARAM_INT);
    }

    $req->execute();
    return $req->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Récupère les alerts en fonction de paramètres $query
 * @param array $query
 * @param PDO $bdd
 * @return array
 */
function exportAlerts($query, $bdd) {
    $sql = "SELECT * FROM alerts WHERE 1=1";

    if (isset($query['sort'])) { // asc || desc
        $sql .= " ORDER BY " . whitelist($query['sby'], ['alert_id', 'name', 'balise_id', 'sensor_id', 'control', 'sign']) . " " . whitelist($query['sort'], ['asc', 'desc']);
    }
    if (isset($query['limit'])) { // int
        $sql .= " LIMIT :limit";
    }

    $req = $bdd->prepare($sql);

    if (isset($query['limit'])) { // int
        $req->bindValue('limit', $query['limit'], PDO::PARAM_INT);
    }

    $req->execute();
    return $req->fetchAll(PDO::FETCH_ASSOC);
}
