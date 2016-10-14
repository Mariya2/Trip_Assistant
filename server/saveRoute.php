<?php

session_start();

if(empty($_SESSION['user'])){
	header("HTTP/1.0 401 Unauthorized");
}

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}


$userId = empty($_POST['user']) ? '': $_POST['user'];
$origin = empty($_POST['origin']) ? '': $_POST['origin'];
$destination = empty($_POST['destination']) ? '': $_POST['destination'];
$waypoints = empty($_POST['waypoints']) ? '': $_POST['waypoints'];
$optWaypoints = empty($_POST['optimizeWaypoints']) ? '': $_POST['optimizeWaypoints'];
$unitSystem = empty($_POST['unitSystem']) ? '': $_POST['unitSystem'];
$travelMode = empty($_POST['travelMode']) ? '': $_POST['travelMode'];
$route = [[$userId, $origin, $destination, $waypoints, $optWaypoints, $unitSystem, $travelMode]];

/* $key = isset($_POST['key']) ? $_POST['key'] : null;
if (empty($key)) {
	$_SESSION['list'][] = $people;
} else {
	$_SESSION['list'][$key] = $people;
} */

/* $people = [['aaa', 'aaa', "aaa"]]; */


require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertRouteSql = 'INSERT INTO routes (user_id, origin, destination, waypoints, optimize_waypoints, unit_system, travel_mode) VALUES (?, ?, ?, ?, ?, ?, ?)';  
$statement = $pdo->prepare($insertRouteSql);

$ids = [];
foreach ($route as $item) {

   $statement -> execute($item);
   $ids[] = $pdo->lastInsertId();
}

if ($ids[0] == "" && $ids[1] == "" && $ids[2] == "" && $ids[3] == "" && $ids[4] == "" && $ids[5] == "" && $ids[6] == "") {
	header("HTTP/1.0 404 Not Found");
	return;
} else {
	echo json_encode(['success' => true]);
}