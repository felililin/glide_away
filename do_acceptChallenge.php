<?php

include("db.php");
session_start();

$challengeID = $_GET["challenge_id"];
$sql = "SELECT game_id FROM challenges WHERE id = " . $challengeID;
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$gameID = $row["game_id"];
$_SESSION["challenge_id"] = $challengeID;
$conn->close();

switch ($gameID) {
    case 1:
        header("Location: penguin.php");
        break;
    case 2:
        header("Location: blackjack.php");
        break;
    case 3:
        header("Location: fastFinger.php");
        break;
}

?>