let canvas;
let context;
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let typedLetter = []
let startTime;
let totalTime = 0;
let isGameStarted = false;
let mainInterval;
let background;

function initialRender() {
    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");

    renderUtilities();

    const startButton = document.getElementById("startButton");
    const startX = canvas.clientWidth / 2 - startButton.width / 4;
    const startY = canvas.clientHeight / 2 - startButton.height / 4;
    context.drawImage(startButton, startX, startY, startButton.width / 2, startButton.height / 2);

    context.font = "72px Times New Roman";
    context.fillStyle = "#FF3828";
    context.textAlign = "center";
    context.fillText(`0.000 s`, canvas.width / 2, 230);

    renderAlphabet();
    setupEventHandler();
}

$(document).ready(function () {
    background = document.getElementById("bg");

    $("#bg").on('load', function () {
        initialRender();
    })
        .on('error', function () {
            // do stuff on smth wrong (error 404, etc.)
        })
        .each(function () {
            if (this.complete) {
                initialRender();
            }
        });
})

function renderUtilities() {
    context.drawImage(background, 0, 0, canvas.clientWidth, canvas.clientHeight);

    context.font = "72px Times New Roman";
    context.textAlign = "center";
    context.fillStyle = "#FF3828"
    context.fillText("Fast Finger!", canvas.width / 2, 80);

    context.font = "30px Times New Roman";
    context.fillStyle = "#5B986E";
    context.fillText("Type from A-Z in order as fast as you can!", canvas.width / 2, 140);
}

function renderTime() {
    const endTime = new Date();
    let diff = endTime - startTime;
    diff /= 1000

    if (!isGameStarted) {
        totalTime = diff
    }

    context.font = "72px Times New Roman";
    context.fillStyle = "#FF3828";
    context.textAlign = "center";

    context.fillText(`${diff} s`, canvas.width / 2, 230);
}

function startGame() {
    isGameStarted = true;
    startTime = new Date();
    typedLetter = [];

    mainInterval = setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderUtilities();
        renderAlphabet();
        renderTime();
    }, 16);
}

function endGame() {
    isGameStarted = false;
    setTimeout(function () {
        clearInterval(mainInterval);
        renderScore();
    }, 32);
}

function renderScore() {
    context.fillStyle = "#FF3828";
    context.fillRect(canvas.width / 2 - 300, 300, 600, 80);

    const score = Math.round((15 - totalTime - 2) / 15 * 100);

    context.font = "72px Times New Roman";
    context.fillStyle = "#FFFFFF";
    context.textAlign = "center";
    context.fillText(`Your Score: ${score}`, canvas.width / 2, 365);

    $("#homeButton").show();
    $("#replayButton").show();
}

function submitScore(replay) {
    const score = Math.round((15 - totalTime - 2) / 15 * 100);
    $("#score").val(score);
    $("#playAgain").val(replay ? 1 : 0);
    $("#gameForm").submit();
}

function renderAlphabet() {
    context.font = "48px Times New Roman";
    context.fillStyle = "#5B986E";
    context.textAlign = "center";
    let x = (canvas.width - 1196) / 2 + 24;
    for (let i = 0; i < alphabets.length; i++) {
        if (i == typedLetter.length) {
            context.fillStyle = "#FF3828"
        }
        context.fillText(alphabets[i], x, canvas.height / 10 * 7.5);
        x += 46
    }
    console.log(x);
}

function setupEventHandler() {
    const leftOffset = canvas.getClientRects()[0].x
    const topOffset = canvas.getClientRects()[0].y
    const startButton = document.getElementById("startButton");

    $("#canvas").click(function (e) {
        if (isGameStarted) {
            return;
        }

        const startX = canvas.clientWidth / 2 - startButton.width / 4;
        const startY = canvas.clientHeight / 2 - startButton.height / 4;
        const x = e.clientX - leftOffset;
        const y = e.clientY - topOffset;

        if (x > startX && x < startX + startButton.width / 2 && y > startY && y < startY + startButton.height / 2) {
            startGame();
        }
    })

    document.addEventListener("keyup", function (e) {
        if (!isGameStarted || totalTime > 0) {
            return;
        }

        if (e.key.toUpperCase() == alphabets[typedLetter.length]) {
            typedLetter.push(e.key.toUpperCase())
        }

        if (typedLetter.length == alphabets.length) {
            endGame()
        }
    })

    $("#homeButton").click(function () {
        submitScore(false)
    })

    $("#replayButton").click(function () {
        submitScore(true)
    })
}
