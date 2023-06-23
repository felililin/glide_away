<?php

include("header.php");
include("db.php");

$sql = "SELECT c.id, c.game_id, challenger_score, challenged_score, is_challenged_win, c.created_at, g.name as game_name, u.username as challenger_name, u2.username as challenged_name FROM challenges c JOIN games g ON c.game_id = g.id JOIN users u ON u.id = c.user_id JOIN users u2 ON u2.id = c.challenged_id WHERE c.challenged_id = ".$_SESSION["user_id"]." ORDER BY created_at DESC";
$result = $conn->query($sql);

$sql = "SELECT c.id, challenger_score, challenged_score, is_challenged_win, c.created_at, g.name as game_name, u.username as challenger_name, u2.username as challenged_name FROM challenges c JOIN games g ON c.game_id = g.id JOIN users u ON u.id = c.user_id JOIN users u2 ON u2.id = c.challenged_id WHERE c.user_id = ".$_SESSION["user_id"]." ORDER BY created_at DESC";
$sentChallenges = $conn->query($sql);

$conn->close();

?>

<link rel="stylesheet" href="css/challenges.css">

<div id="challengeContainer">
    <div>
        <h2>Incoming Challenge</h2>
        <table>
            <thead>
                <tr>
                    <th>Challenger</th>
                    <th>Game Name</th>
                    <th>Challenger Score</th>
                    <th>Your Score</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($row = $result->fetch_assoc()) { 
                    $date = date_create($row["created_at"]);
                    $date = date_format($date, "j-n-Y")
                ?>
                    <tr>
                        <td><?= $row["challenger_name"] ?></td>
                        <td><?= $row["game_name"] ?></td>
                        <td><?= $row["challenger_score"] ?></td>
                        <td><?= $row["challenged_score"] == 0 ? "N/A" : $row["challenged_score"] ?></td>
                        <td><?= $date ?></td>
                        <td>
                            <?php if ($row["challenged_score"] == 0) { ?>
                                <a href="do_acceptChallenge.php?challenge_id=<?= $row["id"] ?>">
                                    <button class="btn btn-primary">Accept</button>
                                </a>
                            <?php } else { ?>
                                <button class="btn btn-warning" onclick="reChallenge(<?= $row["game_id"] ?>, '<?= $row["challenger_name"] ?>')">Play Again</button>
                            <?php } ?>
                        </td>
                    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>
    <form method="post" action="do_createChallenge.php" class="hidden" id="challengeForm">
        <input type="text" name="username" id="challengeUsername">
        <input type="text" name="game" id="challengeGameID" required>
    </form>
    <div>
        <div class="inline">
            <h2>Sent Challenge</h2>
            <a href="createChallenges.php"><button id="challengeButton" class="btn btn-primary align-right">Create Challenge</button></a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Game Name</th>
                    <th>Your Score</th>
                    <th>Challenged Score</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($row = $sentChallenges->fetch_assoc()) { 
                    $date = date_create($row["created_at"]);
                    $date = date_format($date, "j-n-Y")
                ?>
                    <tr>
                        <td><?= $row["challenged_name"] ?></td>
                        <td><?= $row["game_name"] ?></td>
                        <td><?= $row["challenger_score"] ?></td>
                        <td><?= $row["challenged_score"] == 0 ? "N/A" : $row["challenged_score"] ?></td>
                        <td><?= $date ?></td>
                        <td>
                            <?php if ($row["challenged_score"] != 0) { ?>
                                <button class="btn btn-warning" onclick="reChallenge(<?= $row["game_id"] ?>, '<?= $row["challenger_name"] ?>')">Play Again</button>
                            <?php } else {
                            echo "Waiting Response...";
                            }
                            ?>
                        </td>
                    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<script src="js/challenges.js"></script>
<?php

include("footer.php");

?>