<?php
session_start();

$key = isset($_GET['key']) ? $_GET['key'] : '';

if (isset($_SESSION['list'][$key])) {
	unset($_SESSION['list'][$key]);
}

echo json_encode(['success' => true]);


//db
require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost; dbname=trip-site', DB_USER, DB_PASS, [
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('DELETE FROM qoutesbook WHERE id = ?');
$sth->execute(['#']);
echo ($sth->rowCount());