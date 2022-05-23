<?php

include('../includes/functions.php');

try {
    isSetArray($_GET, array(
        "name"
    ));
    typeCheck(array(
        "string" => $_GET['name'],
    ));
} catch (Exception $e) {
    res(array(
        "error" => $e->getMessage()
    ), 400);
}
