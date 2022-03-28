<?php


/**
 * 
 */
function jsonInput() {
    // si url donnee dans l'url
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
