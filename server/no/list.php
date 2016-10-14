<?php
session_start(); 

$data = isset($_SESSION['list']) ? $_SESSION['list'] : []; 
/* echo json_encode($data); */
//db
require_once '../db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('SELECT * FROM quotesbook');
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if(!empty($result)){
	
	echo json_encode($result);
}