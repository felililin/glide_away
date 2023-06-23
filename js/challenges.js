function reChallenge(gameID, username) {
    $("#challengeUsername").val(username);
    $("#challengeGameID").val(gameID);
    $("#challengeForm").submit();
}