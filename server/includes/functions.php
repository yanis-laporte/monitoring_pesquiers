<?php

$_DEV_MODE = true;

cors();


/**
 * Parse les données récupérées dans php://input
 * Si les données envoyé ne sont pas dans le format 'application/x-www-form-urlencoded' ou 'multipart/form-data'
 * alors $_POST ne contiendra rien car PHP ce sait pas quoi faire des données, le seul moyen de les récupérer c'est via php://input
 * https://stackoverflow.com/questions/8893574/php-php-input-vs-post#8893792
 * @return array
 */
function jsonInput() {

    if ($_POST) {
        return $_POST;
    } else {
        $rawJson = json_decode(file_get_contents('php://input'));
        $json = [];
        foreach ($rawJson as $key => $value) {
            $json[$key] = $value;
        }
        return $json;
    }
}

/**
 * 
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 * 
 * [https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers]
 *
 */
function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}

/**
 * Retourne une réponse au format json.
 * puis termine l'execution du script.
 * 
 * @param array $data Les données à retourner
 * @param int $status Le code de statut HTTP (défaut: 200)
 * @return void
 */
function res($data, $status = 200) {
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data);
    exit();
}

/**
 * Retourne true si l'utilisateur est connecté
 * @return boolean
 */
function isConnected() {
    session_start();

    global $_DEV_MODE;

    if (isset($_SESSION['isConnected']) && $_SESSION['isConnected'] || $_DEV_MODE) {
        return true;
    } else {
        return false;
    }
}

/**
 * Permet de protéger une route
 */
function protectedRoute() {
    if (!isConnected()) { // L'utilisateur n'est pas connecté
        res(array(
            "success" => false,
            "message" => "Vous n'êtes pas connecté"
        ), 401); // 401 -> Unauthorized
    }
}

/**
 * @param string value (passé en référence) La valeurs à vérifier
 * @param array allowed Les valeurs autorisées
 * @return string La valeur passée en paramètre ou la valeur par défaut (index 0 de allowed)
 */
function whitelist(&$value, $allowed) {
    if ($value == null) {
        return $allowed[0];
    }
    if (in_array($value, $allowed)) {
        return $value;
    } else {
        return $allowed[0];
    }
}

/**
 * Test si dans une variable existe une clé.
 * Throw une exception si la clé n'existe pas.
 * @param array $src Tableau de variables
 * @param array $arr Tableau de clés a tester
 *
 */
function issetArray($src, $arr) {
    foreach ($arr as $key) {
        if (!isset($src[$key])) {
            throw new Exception("Missing key: $key");
        }
    }
}
