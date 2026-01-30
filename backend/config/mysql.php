<?php
$host = getenv("MYSQL_HOST");
$user = getenv("MYSQL_USER");
$password = getenv("MYSQL_PASSWORD");
$dbname = getenv("mydb");

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("DB connection failed");
}


?>