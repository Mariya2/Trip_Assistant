<?php
if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
	$_GET = array_merge($_GET, (array) json_decode(trim(file_get_contents('php://input')), true));
}

$id= isset($_GET['userId'])?$_GET['userId']: '';

require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare("SELECT origin, destination, waypoints, optimize_waypoints, unit_system, travel_mode FROM routes WHERE user_id=$id ");
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

if(!empty($result)){

	echo json_encode($result);
} 