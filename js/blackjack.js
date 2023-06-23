// cheat mode activation
// Bet : 123123, and click start, then assign the actual bet

let histories = [];
let totalChips = 100

var cards = [
  "AH",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "10H",
  "JH",
  "QH",
  "KH",
  "AD",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "10D",
  "JD",
  "QD",
  "KD",
  "AS",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "10S",
  "JS",
  "QS",
  "KS",
  "AC",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "10C",
  "JC",
  "QC",
  "KC",
];

var dealersCards = [];
var playersCards = [];
var playersSecondCards = [];
var betChips = 10;
var secondChips = 10;
var isInCheatMode = false;
var handCount = 1;

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

function startGame() {
  let shouldStart = assignBet();
  if (!shouldStart) {
    return;
  }

  $("#hit").prop("disabled", false);
  $("#stand").prop("disabled", false);
  $("#double").prop("disabled", false);
  $("#split").prop("disabled", false);
  $("#surrender").prop("disabled", false);
  $("#hit2").prop("disabled", false);
  $("#stand2").prop("disabled", false);
  $("#double2").prop("disabled", false);
  $("#surrender2").prop("disabled", false);

  updateChips();
  shuffle(cards);
  if (isInCheatMode) {
    var index = cards.findIndex(
      (element) =>
        element == "JH" ||
        element == "QH" ||
        element == "KH" ||
        element == "JD" ||
        element == "QD" ||
        element == "KD" ||
        element == "JS" ||
        element == "QS" ||
        element == "KS" ||
        element == "JC" ||
        element == "QC" ||
        element == "KC"
    );
    dealersCards.push(cards.splice(index, 1)[0]);

    index = cards.findIndex(
      (element) =>
        element == "AH" || element == "AD" || element == "AC" || element == "AS"
    );
    dealersCards.push(cards.splice(index, 1)[0]);
  } else {
    dealersCards.push(cards.pop());
    dealersCards.push(cards.pop());
  }

  playersCards.push(cards.pop());
  playersCards.push(cards.pop());

  renderInitialDealerCards();
  renderPlayerCards();
  $("#submitButton").prop("disabled", true);
  $("#submitButton2").prop("disabled", true);
  if (getValue(playersCards) == 21) {
    histories.push({
      bet: betChips,
      dealersCards: [],
      playersCards: [],
      move: "start",
      dealersCardsAfter: copyArray(dealersCards),
      playersCardsAfter: copyArray(playersCards),
      result: "win",
    });
    renderHistories();
    playerWin(false);
    return;
  }
  histories.push({
    bet: betChips,
    dealersCards: [],
    playersCards: [],
    move: "start",
    dealersCardsAfter: copyArray(dealersCards),
    playersCardsAfter: copyArray(playersCards),
    result: "game continues",
  });
  renderHistories();
}

function getValue(array) {
  var i = 0;
  var total = 0;
  var totalAce = 0;
  for (i; i < array.length; i++) {
    if (array[i][0] == "A") {
      total += 11;
      totalAce += 1;
    } else if (array[i][0] == "2") {
      total += 2;
    } else if (array[i][0] == "3") {
      total += 3;
    } else if (array[i][0] == "4") {
      total += 4;
    } else if (array[i][0] == "5") {
      total += 5;
    } else if (array[i][0] == "6") {
      total += 6;
    } else if (array[i][0] == "7") {
      total += 7;
    } else if (array[i][0] == "8") {
      total += 8;
    } else if (array[i][0] == "9") {
      total += 9;
    } else if (array[i][0] == "1") {
      total += 10;
    } else if (array[i][0] == "J") {
      total += 10;
    } else if (array[i][0] == "Q") {
      total += 10;
    } else if (array[i][0] == "K") {
      total += 10;
    }
  }

  while (totalAce > 0 && total > 21) {
    total -= 10;
    totalAce--;
  }
  return total;
}

function assignBet() {
  betChips = parseInt($("#inputBet").val());

  if (betChips == 123123) {
    alert("Entering cheat mode");
    isInCheatMode = true;
    return false;
  }
  if (betChips > totalChips) {
    alert("Insufficient amount of chips for betting!");
    return false;
  }
  // disable input
  $("#inputBet").prop("disabled", true);
  $("#inputBet2").prop("disabled", true);
  return true;
}

function hitCard(array) {
  array.push(cards.pop());
}

function copyArray(array) {
  let result = [];
  array.forEach((elem) => result.push(elem));
  return result;
}

function playerHit(isDouble, isSecondHand) {
  let playerCopy = isSecondHand
    ? copyArray(playersSecondCards)
    : copyArray(playersCards);
  hitCard(isSecondHand ? playersSecondCards : playersCards);

  renderPlayerCards();
  if (isSecondHand) {
    renderPlayerSecondCards();
  }

  if (!isSecondHand) {
    var total = getValue(playersCards);
    if (total > 21) {
      playerLose(false);
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: isDouble ? "double" : "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersCards),
        result: "lose",
      });
      renderHistories();
      return true;
    } else if (total == 21) {
      playerWin(false);
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: isDouble ? "double" : "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersCards),
        result: "win",
      });
      renderHistories();

      return true;
    }

    if (!isDouble) {
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersCards),
        result: "game continues",
      });
      renderHistories();
    }
  } else {
    var total = getValue(playersSecondCards);
    if (total > 21) {
      playerLose(true);
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: isDouble ? "double" : "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersSecondCards),
        result: "lose",
      });
      renderHistories();
      return true;
    } else if (total == 21) {
      playerWin(true);
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: isDouble ? "double" : "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersSecondCards),
        result: "win",
      });
      renderHistories();

      return true;
    }

    if (!isDouble) {
      histories.push({
        bet: betChips,
        dealersCards: dealersCards,
        playersCards: playerCopy,
        move: "hit",
        dealersCardsAfter: copyArray(dealersCards),
        playersCardsAfter: copyArray(playersSecondCards),
        result: "game continues",
      });
      renderHistories();
    }
  }

  return false;
}

function setupData(result) {
  $("#score").val(totalChips);
  alert(result);
  resetGame();
}

function playerLose(isSecondHand) {
  let chips = parseInt(
    $(isSecondHand ? "#inputBet2" : "#inputBet").val()
  );
  totalChips -= chips;
  updateChips();
  handCount--;
  disableAction(isSecondHand);
  renderDealerCards();
  setTimeout(function () {
    if (handCount <= 0) {
      setupData("YOU LOSE!")
    } else {
      alert("YOU LOSE!");
    }
  }, 50);
}

function playerWin(isSecondHand) {
  let chips = parseInt(
    $(isSecondHand ? "#inputBet2" : "#inputBet").val()
  );
  totalChips += chips;
  updateChips();
  handCount--;
  disableAction(isSecondHand);
  renderDealerCards();
  setTimeout(function () {
    if (handCount <= 0) {
      setupData("YOU WIN!")
    } else {
      alert("YOU WIN!");
    }
  }, 50);
}

function playerBlackJack(isSecondHand) {
  let chips = parseInt(
    $(isSecondHand ? "#inputBet2" : "#inputBet").val()
  );
  totalChips += 2 * chips;
  updateChips();
  handCount--;
  setTimeout(function () {
    alert("BLACKJACK! YOU WIN!");
    if (handCount <= 0) {
      resetGame();
    }
  }, 50);
}

function stand(isSecondHand) {
  handCount--;
  disableAction(isSecondHand);
  if (handCount == 0) {
    moveDealers("stand", playersCards);
  }
}

function disableAction(isSecondHand) {
  if (isSecondHand) {
    $("#hit2").prop('disabled', true);
    $("#stand2").prop('disabled', true);
    $("#double2").prop('disabled', true);
    $("#surrender2").prop('disabled', true);
  } else {
    $("#hit").prop('disabled', true);
    $("#stand").prop('disabled', true);
    $("#double").prop('disabled', true);
    $("#split").prop('disabled', true);
    $("#surrender").prop('disabled', true);
  }
}

function moveDealers(playerAction, playerCopy, isSecondHand) {
  var dealerCopy = copyArray(dealersCards);
  var dealerScore = getValue(dealersCards);
  var playerScore = getValue(playersCards);
  while (dealerScore < 18) {
    hitCard(dealersCards);
    dealerScore = getValue(dealersCards);
    renderDealerCards();
  }

  if (dealerScore > 21) {
    renderDealerCards();
    playerWin(isSecondHand);
    histories.push({
      bet: betChips,
      dealersCards: dealerCopy,
      playersCards: playerCopy,
      move: playerAction,
      dealersCardsAfter: copyArray(dealersCards),
      playersCardsAfter: copyArray(playersCards),
      result: "win",
    });
    renderHistories();
  } else if (playerScore < 21 && playerScore > dealerScore) {
    renderDealerCards();
    playerWin(isSecondHand);
    histories.push({
      bet: betChips,
      dealersCards: dealerCopy,
      playersCards: playerCopy,
      move: playerAction,
      dealersCardsAfter: copyArray(dealersCards),
      playersCardsAfter: copyArray(playersCards),
      result: "win",
    });
    renderHistories();
  } else if (playerScore == 21) {
    renderDealerCards();
    playerBlackJack(isSecondHand);
    histories.push({
      bet: betChips,
      dealersCards: dealerCopy,
      playersCards: playerCopy,
      move: playerAction,
      dealersCardsAfter: copyArray(dealersCards),
      playersCardsAfter: copyArray(playersCards),
      result: "win",
    });
    renderHistories();
  } else {
    renderDealerCards();
    playerLose(isSecondHand);
    histories.push({
      bet: betChips,
      dealersCards: dealerCopy,
      playersCards: playerCopy,
      move: playerAction,
      dealersCardsAfter: copyArray(dealersCards),
      playersCardsAfter: copyArray(playersCards),
      result: "lose",
    });
    renderHistories();
  }
}

function double(isSecondHand) {
  let betChips = parseInt(
    $(isSecondHand ? "#inputBet2" : "#inputBet").val()
  );
  if (totalChips - 2 * betChips < 0) {
    alert("Insufficient amount of chips for betting");
    return;
  }
  $(isSecondHand ? "#inputBet2" : "#inputBet").val(betChips * 2);
  let playerCopy = isSecondHand
    ? copyArray(playersSecondCards)
    : copyArray(playersCards);
  let isGameEnds = playerHit(true, isSecondHand);
  if (isGameEnds) {
    return;
  }
  moveDealers("double", playerCopy, isSecondHand);
}

function split() {
  if (playersCards.length > 2) {
    alert("Can't split, you have taken another card.");
    return;
  } else if (playersCards.length == 2) {
    let firstCard = playersCards[0][0];
    let secondCard = playersCards[1][0];
    if (firstCard != secondCard) {
      alert("Can't Split, different card value.");
      return;
    }
  } else {
    alert("Can't split.");
    return;
  }

  handCount++;
  let cardBefore = copyArray(playersCards);
  let card = playersCards.pop();
  playersSecondCards.push(card);
  playerHit(true, false);
  histories.push({
    bet: betChips,
    dealersCards: dealersCards,
    playersCards: cardBefore,
    move: "split",
    dealersCardsAfter: copyArray(dealersCards),
    playersCardsAfter: copyArray(playersCards),
    result: "game continues",
  });
  playerHit(false, true);
  $("#split").prop('disabled', true);
}

function surrender(isSecondHand) {
  $("#inputBet").val(betChips / 2);
  totalChips -= betChips / 2;
  let card = isSecondHand
    ? copyArray(playersSecondCards)
    : copyArray(playersCards);
  updateChips();
  histories.push({
    bet: betChips,
    dealersCards: copyArray(dealersCards),
    playersCards: card,
    move: "surrender",
    dealersCardsAfter: copyArray(dealersCards),
    playersCardsAfter: isSecondHand
      ? copyArray(playersSecondCards)
      : copyArray(playersCards),
    result: "lose",
  });
  disableAction(isSecondHand);
  renderHistories();
  handCount--;
  if (handCount == 0) {
    setupData("YOU SURRENDER, YOU LOSE!");
    resetGame();
  }
}

function resetGame() {
  playersCards.forEach(function (card) {
    cards.push(card);
  });
  playersCards = [];
  renderPlayerCards();

  playersSecondCards.forEach(function (card) {
    cards.push(card);
  });
  playersSecondCards = [];

  dealersCards.forEach(function (card) {
    cards.push(card);
  });
  dealersCards = [];
  renderDealerCards();

  betChips = 10;

  handCount = 1;
  $("#inputBet").val(10);
  $("#inputBet").prop('disabled', false);
  $("#submitButton").prop('disabled', false);
  $("#hit").prop('disabled', true);
  $("#stand").prop('disabled', true);
  $("#double").prop('disabled', true);
  $("#split").prop('disabled', true);
  $("#surrender").prop('disabled', true);

  $("#inputBet2").val(10);
  $("#inputBet2").prop('disabled', false);
  $("#submitButton2").prop('disabled', false);
  $("#hit2").prop('disabled', true);
  $("#stand2").prop('disabled', true);
  $("#double2").prop('disabled', true);
  $("#surrender2").prop('disabled', true);

  $("#playerSecondHand").hide();
  updateChips();
  if (totalChips < betChips) {
    $("#inputBet").prop('disabled', true);
    $("#submitButton").prop('disabled', true);

    $("#inputBet2").prop('disabled', true);
    $("#submitButton2").prop('disabled', true);
  }
}

function getImageName(card) {
  let suit = card[card.length - 1];
  if (suit == "C") {
    suit = "club";
  } else if (suit == "D") {
    suit = "diamond";
  } else if (suit == "H") {
    suit = "heart";
  } else if (suit == "S") {
    suit = "spade";
  }

  let rank = card[0];
  if (rank == "A") {
    rank = "ace";
  } else if (rank == "2") {
    rank = "2";
  } else if (rank == "3") {
    rank = "3";
  } else if (rank == "4") {
    rank = "4";
  } else if (rank == "5") {
    rank = "5";
  } else if (rank == "6") {
    rank = "6";
  } else if (rank == "7") {
    rank = "7";
  } else if (rank == "8") {
    rank = "8";
  } else if (rank == "9") {
    rank = "9";
  } else if (rank == "1") {
    rank = "10";
  } else if (rank == "J") {
    rank = "jack";
  } else if (rank == "Q") {
    rank = "queen";
  } else if (rank == "K") {
    rank = "king";
  }

  return suit + "-" + rank + ".png";
}
function renderInitialDealerCards() {
  let html = '';
  html = `<div>
    <img src="images/${getImageName(dealersCards[0])}"> </div>
    <img src="images/backcard.jpeg"> </div>
    <div></div>
    <div></div>
    <div></div>`;
  $("#dealerDeck").html(html);
}

function renderDealerCards() {
  var i = 0;

  let html = '';
  for (i; i < dealersCards.length; i++) {
    html += `<div>
    <img src="images/${getImageName(dealersCards[i])}"> </div>`
  }

  i = 0;
  for (i; i < 5 - dealersCards.length; i++) {
    html += `<div></div>`
  }
  $("#dealerDeck").html(html);
}

function renderPlayerCards() {
  var i = 0;
  let html = '';
  for (i; i < playersCards.length; i++) {
    html += `<div><img src="images/${getImageName(playersCards[i])}"> </div>`;
  }
  i = 0;
  for (i; i < 5 - playersCards.length; i++) {
    html += `<div></div>`;
  }
  $("#playerDeck").html(html);
}

function renderPlayerSecondCards() {
  $("#playerSecondHand").show();
  var i = 0;
  let html = '';

  for (i; i < playersSecondCards.length; i++) {
    html += `<div><img src="images/${getImageName(playersSecondCards[i])}"> </div>`;
  }
  i = 0;
  for (i; i < 5 - playersSecondCards.length; i++) {
    html += `<div></div>`;
  }
  $("#playerSecondDeck").html(html);
}

function updateChips() {
  $("#totalChips").html(`Total Chips : ${totalChips}`);
}

function renderHistories() {
  let rows = histories.map((e) => getHistoryRow(e));
  let rowsHTML = rows.join("\n");
  $("#historyTable").html(rowsHTML);
}

function getCardsHTML(cards) {
  if (!cards) {
    return "";
  }
  let html = "";
  cards.forEach(function (card) {
    html += '<img src="images/' + getImageName(card) + '" />';
  });
  return html;
}

function getHistoryRow(history) {
  let dealersCards = getCardsHTML(history.dealersCards);
  let dealersCardsAfter = getCardsHTML(history.dealersCardsAfter);
  let playersCards = getCardsHTML(history.playersCards);
  let playersCardsAfter = getCardsHTML(history.playersCardsAfter);
  return `
    <tr>
        <td>${history.bet}</td>
        <td>${dealersCards}</td>
        <td>${dealersCardsAfter}</td>
        <td>${playersCards}</td>
        <td>${playersCardsAfter}</td>
        <td>${history.move}</td>
        <td>${history.result}</td>
    </tr>
    `;
}

$(document).ready(function () {
  $("#hit").click(function () {
    playerHit(false, false);
  });

  $("#hit2").click(function () {
    playerHit(false, true);
  });

  $("#stand").click(function () {
    stand(false);
  });

  $("#stand2").click(function () {
    stand(true);
  });

  $("#double").click(function () {
    double(false);
  });

  $("#double2").click(function () {
    double(true);
  });

  $("#split").click(function () {
    split();
  });

  $("#surrender").click(function () {
    surrender(false);
  });

  $("#surrender2").click(function () {
    surrender(true);
  });

  $("#submitButton").click(function () {
    startGame();
  })
  $("#hit").prop('disabled', true);
  $("#stand").prop('disabled', true);
  $("#double").prop('disabled', true);
  $("#split").prop('disabled', true);
  $("#surrender").prop('disabled', true);

  $("#hit2").prop('disabled', true);
  $("#stand2").prop('disabled', true);
  $("#double2").prop('disabled', true);
  $("#surrender2").prop('disabled', true);
  updateChips()

  $("#stop").click(function () {
    $("#score").val(totalChips);
    $("#dummyForm").submit()
  })
});
