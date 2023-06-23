<?php

session_start();
$_SESSION["user_id"] = NULL;
$_SESSION["username"] = NULL;
$_SESSION["user_email"] = NULL;
session_destroy();
header("Location: index.php");

?>