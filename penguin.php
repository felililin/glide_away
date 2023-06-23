<?php

include("header.php");

?>

<link rel="stylesheet" href="css/game.css">
<link rel="stylesheet" href="css/penguin.css">

<div id="gameContainer">
    <h1 id="title">Penguin Glider</h1>
    <canvas id="canvas"></canvas>
    <button id="homeButton" class="btn btn-warning hidden">Back to Home</button>
    <button id="replayButton" class="btn btn-primary hidden">Play Again</button>
</div>

<div class="assets hidden">
    <img id="bg" src="images/icy-bg.jpg"/>
    <img id="penguinSprite" src="images/penguinSprite.png" />
    <img id="ice" src="images/ice.png" />
    <img id="walrus" src="images/walrus.png" />
    <img id="wolf" src="images/wolf.png" />
    <img id="snowman" src="images/snowman.png" />
    <img id="wolf2" src="images/wolf2.png" />

    <form id="gameForm" method="POST" action="do_saveGameResult.php">
        <input type="number" name="game_id" value="1" />
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

<script src="js/penguin.js"></script>

<?php

include("footer.php");

?>