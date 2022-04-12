<?php
date_default_timezone_set('Europe/Paris');

try {
    $bdd = new PDO('mysql:host=db;dbname=monitoring_pesquiers;charset=utf8', 'root', 'root');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
