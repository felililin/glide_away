<?php

session_start();
include("db.php");

$sql = "SELECT id, username, email FROM users WHERE username = '" . $_POST["username"] . "' AND password = '" . md5($_POST["password"]) . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION["user_id"] = $row["id"];
    $_SESSION["username"] = $row["username"];
    $_SESSION["user_email"] = $row["email"];
    $_SESSION["FLASH_MESSAGE"] = NULL;
    $conn->close();
    header("Location: home.php");
} else {
    $_SESSION["FLASH_MESSAGE"] = "Wrong Username And Password Combination";
    $conn->close();
    header("Location: index.php");
}

?>