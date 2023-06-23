<?php

include("db.php");
session_start();

if (array_key_exists("challenge_id", $_POST) && $_POST["challenge_id"] && $_POST["challenge_id"] != 0) {
    $sql = "SELECT user_id, challenged_id FROM challenges WHERE id = " . $_POST["challenge_id"];
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    if ($row["user_id"] == $_SESSION["user_id"]) {
        $sql = "UPDATE challenges SET challenger_score = " . $_POST["score"] . " WHERE id = " . $_POST["challenge_id"];
    } else {
        $sql = "UPDATE challenges SET challenged_score = " . $_POST["score"] . " WHERE id = " . $_POST["challenge_id"];
    }
    $conn->query($sql);
}

$sql = "INSERT INTO leaderboards (user_id, game_id, score, created_at) VALUES(" . $_SESSION["user_id"] . ", " . $_POST["game_id"] . ", " . $_POST["score"] . ", CURRENT_TIMESTAMP)";
$result = $conn->query($sql);
$conn->close();

if (!array_key_exists("playAgain", $_POST) || $_POST["playAgain"] == 0) {
    header("Location: home.php");
} else {
    switch ($_POST["game_id"]) {
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
}

?>