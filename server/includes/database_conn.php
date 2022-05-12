<?php
date_default_timezone_set('Europe/Paris');

try {
    // $bdd = new PDO('mysql:host=db;dbname=monitoring_pesquiers;charset=utf8', 'root', 'root');
    // $bdd = new PDO('mysql:host=salins.btssnir.lycee-costebelle.fr;dbname=monitoring_pesquiers;charset=utf8', 'py_con', 'pesquierPY');
    $bdd = new PDO('mysql:host=192.168.0.120;dbname=monitoring_pesquiers;charset=utf8', 'py_con', 'pesquierPY');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
