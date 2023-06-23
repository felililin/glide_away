<?php

session_start();
if (array_key_exists("user_id", $_SESSION)) {
    header("Location: home.php");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glide Collection - Login</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div id="loginWrapper">
        <img src="images/happy_penguin.jpg" id="loginPenguin" />
        <div id="loginForm">
            <h1>Welcome To Glide Collection</h1>
            <form method="POST" action="do_login.php">
                <input type="text" name="username" placeholder="Username" required minlength="3" />
                <input type="password" name="password" placeholder="Password" required/>
                <?php 
                    if (array_key_exists("FLASH_MESSAGE", $_SESSION)) {
                        echo '<p id="errorMessage">'. $_SESSION["FLASH_MESSAGE"] .'</p>';
                        $_SESSION["FLASH_MESSAGE"] = NULL;
                    }
                ?>
                <button class="btn btn-primary full-width">Login</button>
            </form>
            <p id="register">Need to register? <a href="register.php">Create an Account here!</a></p>
        </div>
    </div>
</body>
</html>