<?php

$server = "localhost";
$username = "root";
$password = "";
$dbName = "glider";

$conn = new mysqli($server, $username, $password, $dbName);

if ($conn->connect_error) {
    echo "asdf";
    // die("DB Connection failed: " . $conn->connect_error);
}

?>