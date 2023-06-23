let canvas;
let context;
let score = 0;
let isGameStarted = false;
let mainInterval;
let background;
let sprite;
let ice;
let obstacles = [];
let bgOffset = 0;
let iceOffset = 0;
let activeObstacles = [];
let spriteCounter = 0;
let penguinY;
let jumpCounter = 0;
let jumpCeiling = 0;
let isMovingDown = false;
let ground;

$(document).ready(function() {
    background = document.getElementById("bg");
    sprite = document.getElementById("penguinSprite");
    ice = document.getElementById("ice");

    const wolf = document.getElementById("wolf");
    const wolf2 = document.getElementById("wolf2");
    const snowman = document.getElementById("snowman");
    const walrus = document.getElementById("walrus");
    obstacles = [wolf, wolf2, snowman, walrus];

    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    $("#canvas").css("height", background.height);
    canvas.height = background.height;
    context = canvas.getContext("2d");
    penguinY = canvas.height - ice.height - 40;
    ground = penguinY;
    jumpCeiling = penguinY;

    activeObstacles = [
        {
            image: obstacles[0],
            offset: canvas.width
        },
        {
            image: obstacles[3],
            offset: canvas.width + 600
        },
        {
            image: obstacles[2],
            offset: canvas.width + 1200
        },
    ]

    $("#penguinSprite").on('load', function() {
        renderWelcomeScreen();
        setupEventHandler();
    }).on('error', function () {
        // do stuff on smth wrong (error 404, etc.)
    })
    .each(function () {
        if (this.complete) {
            renderWelcomeScreen();
            setupEventHandler();
        }
    });
})

function renderWelcomeScreen() {
    renderBackgrounds();
    renderScore();
    renderPenguin();

    context.font = "72px Arial";
    context.textAlign = "center";
    context.fillStyle = "#58287F"
    context.fillText("Penguin Glider!", canvas.width / 2, 150);

    context.font = "32px Arial";
    context.textAlign = "center";
    context.fillStyle = "#58287F"
    context.fillText("Hit Space to Start", canvas.width / 2, 230);
}

function beginGame() {
    beginMainRenderLoop();
}

function renderBackgrounds() {
    let bgX = bgOffset;
    while (bgX < canvas.width) {
        context.drawImage(background, bgX, 0);
        bgX += background.width;
    }
    bgOffset -= 1;
    if (bgOffset <= -background.width) {
        bgOffset = 0;
    }

    let iceX = iceOffset;
    while(iceX < canvas.width) {
        context.drawImage(ice, iceX, canvas.height - ice.height);
        iceX += ice.width;
    }
    iceOffset -= 3;
    if (iceOffset <= -ice.width) {
        iceOffset = 0;
    }
}

function renderScore() {
    context.font = "32px Arial";
    context.fillStyle = "#58287F";
    context.textAlign = "left";
    context.fillText(`Score: ${Math.floor(score)}`, 32, 48);
    score += 0.1;
}

function spawnObstacles() {
    const index = Math.floor(Math.random() * 4);
    const x = Math.floor(Math.random() * 400);
    const obstacle = {
        image: obstacles[index],
        offset: Math.max(activeObstacles[activeObstacles.length - 1].offset + 400 + x, canvas.width + 100)
    }
    activeObstacles.push(obstacle);
}

function renderObstacles() {
    if (activeObstacles.length <= 3) {
        spawnObstacles();
    }

    let obstacleCopy = activeObstacles;
    activeObstacles = [];
    for(let i = 0; i<obstacleCopy.length; i++) {
        let obstacle = obstacleCopy[i];
        const obstacleY = canvas.height - ice.height - obstacle.image.height + 16;
        context.drawImage(obstacle.image, obstacle.offset, obstacleY);
        const imageWidth = obstacle.image.width;

        if (obstacle.image.height < 100) {
            // small obstacle
            if (((obstacle.offset + 15 > 75 && obstacle.offset + 15 < 75 + 64) ||
                (obstacle.offset + imageWidth - 5 > 75 && obstacle.offset + imageWidth - 5 < 75 + 64)) &&
                penguinY - 64 > obstacleY - (obstacle.image.height)) {
                gameOver();
            }
        } else {
            if (((obstacle.offset + 25 > 75 && obstacle.offset + 25 < 75 + 64) ||
                (obstacle.offset + imageWidth - 20 > 75 && obstacle.offset + imageWidth - 20 < 75 + 64)) &&
                penguinY - 64 > obstacleY - (obstacle.image.height - 30)) {
                gameOver();
            }
        }
        
        obstacle.offset -= 3;
        if (obstacle.offset > -200) {
            activeObstacles.push(obstacle);
        }
    }
}

function renderFinalScore() {
    context.font = "72px Arial";
    context.fillStyle = "#FF3828";
    context.textAlign = "center";
    context.fillText(`Game Over!`, canvas.width / 2, 200);

    context.fillText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, 300);

}

function gameOver() {
    setTimeout(function() {
        clearInterval(mainInterval);
        renderFinalScore();
        $("#homeButton").show();
        $("#replayButton").show();
    }, 32);
}

function renderPenguin() {
    const width = 128
    const height = 128

    if (jumpCounter > 0) {
        if (penguinY >= jumpCeiling && !isMovingDown) {
            penguinY -= 3;
            spriteCounter = spriteCounter < 2 ? spriteCounter + 0.3 : spriteCounter;
        } else {
            isMovingDown = true;
            penguinY += 3;
            jumpCeiling += 3;
            spriteCounter = spriteCounter <= 7 ? spriteCounter + 0.3 : 2;
        }
        if (penguinY >= ground) {
            penguinY = ground;
            jumpCounter = 0;
            jumpCeiling = ground;
        }
        const x = 10 + Math.floor(spriteCounter) * width;
        const y = 16 + height * 9;
        context.drawImage(sprite, x, y, width, height, 75, penguinY, width / 2, height / 2);
    } else {
        const x = 15 + Math.floor(spriteCounter) * width;
        const y = 16;
        context.drawImage(sprite, x, y, width, height, 75, penguinY, width / 2, height / 2);
        spriteCounter = spriteCounter >= 7 ? 0 : spriteCounter + 0.3;
    }
}

function beginMainRenderLoop() {
    mainInterval = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderBackgrounds();
        renderScore();
        renderObstacles();
        renderPenguin();
    }, 16);
}

function submitScore(replay) {
    $("#score").val(Math.floor(score));
    $("#playAgain").val(replay ? 1 : 0);
    $("#gameForm").submit();
}

function setupEventHandler() {
    document.addEventListener("keyup", function(e) {
        if (!mainInterval && e.key == " ") {
            beginGame();
        } else if (e.key == " " && jumpCounter < 2) {
            isMovingDown = false;
            jumpCounter += 1;
            jumpCeiling -= 100;
        }
    })

    $("#homeButton").click(function () {
        submitScore(false)
    })

    $("#replayButton").click(function () {
        submitScore(true)
    })
}