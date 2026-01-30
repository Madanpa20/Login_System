<?php
/**
 * Entry Point (index.php)
 * Handles routing based on authentication state.
 * 
 * Note: Since this application uses Stateless Authentication (LocalStorage + Redis),
 * the server cannot strictly verify the session on the initial request without cookies.
 * 
 * However, we follow the best practice of directing the user to the Login page,
 * where the frontend (login.js) will verify the LocalStorage token and 
 * auto-redirect to the Profile page if a valid session exists.
 * 
 * We include session_start() to handle any potential future PHP-based session requirements securely.
 */

session_start();

// Security: Prevent caching to ensure authentication checks always run
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Logic: Strictly redirect to the Login Interface
// The Frontend (JS) will handle the "Already Logged In" check via LocalStorage
header("Location: frontend/login.html");
exit;
?>