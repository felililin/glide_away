<?php

include("db.php");

session_start();
if (!array_key_exists("game", $_POST)) {
    $_SESSION["FLASH_MESSAGE"] = "You have to select a game to continue.";
    $conn->close();
    header("Location: createChallenges.php");
    exit();
}

$sql = "SELECT id FROM users WHERE username = '". $_POST["username"] ."'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $_SESSION["FLASH_MESSAGE"] = "Username not found, please check the username of your friend and try again.";
    $conn->close();
    header("Location: createChallenges.php");
    exit();
}

$row = $result->fetch_assoc();
$friendID = $row["id"];

if ($friendID == $_SESSION["user_id"]) {
    $_SESSION["FLASH_MESSAGE"] = "You can't challenge yourself.";
    $conn->close();
    header("Location: createChallenges.php");
    exit();
}

$sql = "INSERT INTO challenges(user_id, challenged_id, game_id, challenger_score, challenged_score, is_challenged_win, created_at) VALUES(". $_SESSION["user_id"] .", ". $friendID .", ". $_POST["game"] .", 0, 0, 0, CURRENT_TIMESTAMP)";
$result = $conn->query($sql);

if (!$result) {
    $_SESSION["FLASH_MESSAGE"] = "Something went wrong, please try again.";
    $conn->close();
    header("Location: createChallenges.php");
    exit();
}

$_SESSION["challenge_id"] = $conn->insert_id;
$conn->close();
switch ($_POST["game"]) {
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