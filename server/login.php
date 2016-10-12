<?php
session_start();

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
	$_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}
require_once 'db_settings.php';

$user = empty($_POST['name']) ? '': $_POST['name'];
$pass = empty($_POST['password']) ? '': $_POST['password'];

$people = [[$user, $pass]]; 

/* $key = isset($_POST['key']) ? $_POST['key'] : null;
if (empty($key)) {
	$_SESSION['list'][] = $people;
} else {
	$_SESSION['list'][$key] = $people;
}  */

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$statement = $pdo->prepare("SELECT * FROM dblogin where name='$user' AND pass='$pass'");

$statement -> execute();

$result = $statement->fetchAll(PDO::FETCH_ASSOC);

if ($result == []) {
	$response = [
			'success' => false,
			'error' => 'Invalid name or password'
			
	];
	
} else {
	$response = [
			'success' => true,
			'error' => ''
	];
	
}

echo json_encode($response);