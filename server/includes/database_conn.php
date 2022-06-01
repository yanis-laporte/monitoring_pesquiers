<?php
date_default_timezone_set('Europe/Paris');

try {
    $bdd = new PDO('mysql:host=hostname;dbname=monitoring_pesquiers;charset=utf8', 'username', 'password');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
