<?php 

include("header.php");
include("db.php");

$sql = "SELECT user_id, score, username, leaderboards.created_at FROM leaderboards JOIN users ON leaderboards.user_id = users.id WHERE game_id = 1 ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$penguinResult = array();
while($row = $result->fetch_assoc()) {
    $score = new stdClass();
    $score->score = $row["score"];
    $score->username = $row["username"];
    $date = date_create($row["created_at"]);
    $score->date = date_format($date, "j-n-Y");

    array_push($penguinResult, $score);
}

$sql = "SELECT user_id, score, username, leaderboards.created_at FROM leaderboards JOIN users ON leaderboards.user_id = users.id WHERE game_id = 2 ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$blackJackResult = array();
while($row = $result->fetch_assoc()) {
    $score = new stdClass();
    $score->score = $row["score"];
    $score->username = $row["username"];
    $date = date_create($row["created_at"]);
    $score->date = date_format($date, "j-n-Y");

    array_push($blackJackResult, $score);
}

$sql = "SELECT user_id, score, username, leaderboards.created_at FROM leaderboards JOIN users ON leaderboards.user_id = users.id WHERE game_id = 3 ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$fastFingerResult = array();
while($row = $result->fetch_assoc()) {
    $score = new stdClass();
    $score->score = $row["score"];
    $score->username = $row["username"];
    $date = date_create($row["created_at"]);
    $score->date = date_format($date, "j-n-Y");

    array_push($fastFingerResult, $score);
}

$conn->close();

?>

<link rel="stylesheet" href="css/leaderboard.css">

<h1 id="title">Top 10 Leaderboard</h1>
<div id="leaderboardContainer">
    <div class="gameLeaderboard">
        <h3>Penguin Glider</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="penguinTable">
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="gameLeaderboard">
        <h3>Black Jack</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="blackJackTable">
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="gameLeaderboard">
        <h3>Fast Finger</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="fastFingerTable">
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>asdf</td>
                    <td>sc</td>
                    <td>asdf</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
    const penguinResult = JSON.parse(`<?= json_encode($penguinResult) ?>`)
    const blackJackResult = JSON.parse(`<?= json_encode($blackJackResult) ?>`)
    const fastFingerResult = JSON.parse(`<?= json_encode($fastFingerResult) ?>`)
</script>
<script src="js/leaderboard.js"></script>

<?php include("footer.php"); ?>