<?php

session_start();
if (array_key_exists("user_id", $_SESSION)) {
    header("home.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glider Collection - Register</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
    <div id="loginWrapper">
        <img src="images/happy_penguin.jpg" id="loginPenguin" />
        <div id="loginForm">
            <h1>Register</h1>
            <form method="post" action="do_register.php">
                <input name="username" type="text" placeholder="Username" required minlength="3" />
                <input name="email" type="email" placeholder="Email Address" required />
                <input name="password" type="password" placeholder="Password" required />
                <?php 
                    if (array_key_exists("FLASH_MESSAGE", $_SESSION)) {
                        echo '<p id="errorMessage">'. $_SESSION["FLASH_MESSAGE"] .'</p>';
                        $_SESSION["FLASH_MESSAGE"] = NULL;
                    }
                ?>
                <button class="btn btn-primary full-width">Register</button>
            </form>
            <p id="register">Already have an account? <a href="index.php">Login here!</a></p>
        </div>
    </div>
</body>

</html>