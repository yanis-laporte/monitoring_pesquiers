<?php

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
 * exit
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

    if (isset($_SESSION['isConnected']) && $_SESSION['isConnected']) {
        return true;
    } else {
        return false;
    }
}

/**
 * Vérifier si une variable est du type donné.
 * Throw une exception si la variable n'est pas du type donné.
 * Throw une exception si le type n'existe pas.
 * @param array $arr Tableau de variables avec le type a vérifier
 */
function typeCheck($arr) {
    // types valide
    $types = ["boolean", "integer", "double", "string", "array", "NULL"];

    foreach ($arr as $type => $value) {
        //
        if (!in_array($type, $types)) {
            throw new Exception("Invalid type: " . $type);
        }
        // Le type de la valeur est correct
        if (gettype($value) != $type) {
            throw new Exception("Invalid variable type: $value is not a $type");
        }
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
