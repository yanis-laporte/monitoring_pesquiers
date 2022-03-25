<?php


/**
 * 
 */
function jsonInput() {
    $rawJson = json_decode(file_get_contents('php://input'));
    $json = [];
    foreach ($rawJson as $key => $value) {
        $json[$key] = $value;
    }
    return $json;
}
