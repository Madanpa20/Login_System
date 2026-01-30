<?php

require_once __DIR__ . "/../vendor/autoload.php";
$client = new MongoDB\Client(getenv("MONGO_URI"));
$db = $client->guvi_internship;
$profiles = $db->profiles;


