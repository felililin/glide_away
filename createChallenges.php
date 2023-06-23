<?php

include("header.php");

?>

<link rel="stylesheet" href="css/challenges.css">

<div id="challengeFormContainer">
    <h1 id="title">Send a Challenge To Your Friend</h1>
    <form method="post" action="do_createChallenge.php">
        <input type="text" name="username" required placeholder="Friend's Username">
        <select name="game" required>
            <option disabled selected>-- Select a Game --</option>
            <option value="1">Penguin Glider</option>
            <option value="2">Black Jack</option>
            <option value="3">Fast Finger</option>
        </select>
        <?php 
            if (array_key_exists("FLASH_MESSAGE", $_SESSION)) {
                echo '<p id="errorMessage">'. $_SESSION["FLASH_MESSAGE"] .'</p>';
                $_SESSION["FLASH_MESSAGE"] = NULL;
            }
        ?>
        <button id="sendChallenge" class="btn btn-primary">Send Challenge</button>
    </form>
</div>

<?php

include("footer.php");

?>
