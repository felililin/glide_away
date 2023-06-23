<?php

include("db.php");
session_start();

$sql = "SELECT username FROM users where username = '".$_POST["username"]."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $_SESSION["FLASH_MESSAGE"] = "Username has already been taken, please choose another username.";
    $conn->close();
    header("Location: register.php");
    exit();
}

$sql = "INSERT INTO users (username, email, password, created_at) VALUES('" . $_POST["username"] . "', '" . $_POST["email"] . "', '" . md5($_POST["password"]) . "', CURRENT_TIMESTAMP)";
$result = $conn->query($sql);

if ($result) {
    $sql = "SELECT id FROM users WHERE username = '" . $_POST["username"] . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION["user_id"] = $row["id"];
        $_SESSION["username"] = $row["username"];
        $_SESSION["user_email"] = $row["email"];
        $_SESSION["FLASH_MESSAGE"] = NULL;

        $conn->close();
        header("Location: home.php");
        exit();
    }
}

$_SESSION["FLASH_MESSAGE"] = "Something went wrong, please try again later.";
$conn->close();
header("Location: register.php");

?>