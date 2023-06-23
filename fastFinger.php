<?php

include("header.php");

?>

<link rel="stylesheet" href="css/game.css">
<link rel="stylesheet" href="css/fastFinger.css">

<div id="gameContainer">
    <h1 id="title">Fast Finger</h1>
    <canvas id="canvas"></canvas>
    <button id="homeButton" class="btn btn-warning hidden">Back to Home</button>
    <button id="replayButton" class="btn btn-primary hidden">Play Again</button>
</div>

<div class="assets hidden">
    <img id="bg" src="images/keyboard.jpeg"/>
    <img id="startButton" src="images/start.png" />

    <form id="gameForm" method="POST" action="do_saveGameResult.php">
        <input type="number" name="game_id" value="3" />
        <input id="score" type="number" name="score" />
        <input type="number" name="challenge_id" <?php
            if (array_key_exists("challenge_id", $_SESSION)) {
                echo 'value="' . $_SESSION["challenge_id"] . '"';
                $_SESSION["challenge_id"] = NULL;
            }
        ?> />
        <input id="playAgain" type="number" name="playAgain" />
    </form>
</div>

<script src="js/fastFinger.js"></script>

<?php

include("footer.php");

?>