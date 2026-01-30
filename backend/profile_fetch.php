<?php
header("Content-Type: application/json");

require_once "config/redis.php";
require_once "config/mongodb.php";
require_once "config/mysql.php";

$token = $_POST['token'] ?? '';

// 1. Validate Token
if (!$token) {
    echo json_encode(["status" => "error", "message" => "No token provided"]);
    exit;
}

$userId = $redis->get($token);

if (!$userId) {
    echo json_encode(["status" => "error", "message" => "Invalid session"]);
    exit;
}

// 2. Fetch User Details (MySQL) - Name, Email
$stmt = $conn->prepare("SELECT name, email FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$userResult = $stmt->get_result();
$userData = $userResult->fetch_assoc();

if (!$userData) {
    echo json_encode(["status" => "error", "message" => "User record not found"]);
    exit;
}

// 3. Fetch Profile Details (MongoDB) - Age, DOB, Contact
$profile = $profiles->findOne(["user_id" => (int) $userId]);

// 4. Merge Data
$response = [
    "status" => "success",
    "data" => [
        "name" => $userData['name'],
        "email" => $userData['email'],
        "age" => $profile["age"] ?? "",
        "dob" => $profile["dob"] ?? "",
        "contact" => $profile["contact"] ?? ""
    ]
];

echo json_encode($response);
?>