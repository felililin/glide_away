<?php

include("header.php");

?>

<link rel="stylesheet" href="css/blackjack.css">
<h1>Blackjack</h1>
<div class="gameBody">
    <div class="dealer">
        <h3>Dealer</h3>
        <div class="flex-container" id="dealerDeck">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>

    <div class="player">
        <h3>You</h3>
        <div class="flex-container" id="playerDeck">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="options">
            <input type="button" id="hit" value="Hit" class="button-33"> 
            <input type="button" id="stand" value="Stand" class="button-33">
            <input type="button" id="double" value="Double" class="button-33">
            <input type="button" id="split" value="Split" class="button-33">
            <input type="button" id="surrender" value="Surrender" class="button-33">
            <input type="button" id="stop" value="Stop Playing" class="button-33 btn-danger">
        </div>
        <div class="bet" style="text-align: center;">
            <p>Your bet</p>
            <input type="text" id="inputBet" value="10">
            <button type="button" id="submitButton" class="button-33">Start</button>
        </div>
        <div class="total">
            <h3 id="totalChips">Total Chips : 100</h3>
            <p></p>
        </div>
    </div>

    <div class="player" id="playerSecondHand" style="display: none;">
        <h3>You</h3>
        <div class="flex-container" id="playerSecondDeck">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="options">
            <input type="button" id="hit2" class="btn" value="Hit" class="button-33">
            <input type="button" id="stand2" class="btn" value="Stand" class="button-33">
            <input type="button" id="double2" class="btn" value="Double" class="button-33">
            <input type="button" id="surrender2" class="btn" value="Surrender" class="button-33">
        </div>
        <div class="bet" style="text-align: center; margin-bottom: 32;">
            <p>Your bet</p>
            <input type="text" id="inputBet2" value="10">
            <button type="button" id="submitButton2" class="button-33">Start</button>
        </div>
    </div>
</div>
<form id="dummyForm" action="do_saveGameResult.php" method="post" style="display:none">
    <input type="number" name="game_id" value="2" />
    <input id="score" type="number" name="score" />
    <input type="number" name="challenge_id" <?php
        if (array_key_exists("challenge_id", $_SESSION)) {
            echo 'value="' . $_SESSION["challenge_id"] . '"';
            $_SESSION["challenge_id"] = NULL;
        }
    ?> />
</form>
<script src="js/blackjack.js"></script>

<?php

include("footer.php");

?>