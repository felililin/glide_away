<?php

session_start();
if (!array_key_exists("user_id", $_SESSION)) {
    header("Location: index.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glider Collection</title>
    <script src="js/jquery.js" integrity="sha256-ZwqZIVdD3iXNyGHbSYdsmWP//UBokj2FHAxKuSBKDSo=" crossorigin="anonymous"></script>
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <nav>
        <div style="display: flex; align-items: center;">
            <a href="home.php"><img id="logo" src="images/logo.png" /></a>
            <ul>
                <li><a href="home.php">PLAY</a></li>
                <li><a href="challenges.php">Challenges</a></li>
                <li><a href="leaderboard.php">Leaderboard</a></li>
            </ul>
        </div>
        <div id="titleContainer">
            <span id="pageTitle">Glider Collection</span>
        </div>
        <div id="profileContainer">
            <?= $_SESSION["username"] ?>
            (<a style="color: #F5EDCE" href="do_logout.php">Logout</a>)
        </div>
    </nav>
    <div class="bodyContainer">