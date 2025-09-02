const playBoard = document.querySelector(".play-board");
const controls = document.querySelectorAll(".controls i");
const scoreDisplay = document.getElementById('score');
const gameOverContainer = document.querySelector(".game-over");
const restartButton = document.getElementById("restart");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const showGameOver = () => {
    gameOverContainer.style.display = 'block';
    clearInterval(setIntervalId);
};

const restartGame = () => {
    gameOver = false;
    snakeX = 5;
    snakeY = 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    gameOverContainer.style.display = 'none';
    updateFoodPosition();
    setIntervalId = setInterval(initGame, 130);  
};

const handleGameOver = () => {
    showGameOver();
};

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
document.addEventListener("keyup", changeDirection);

const initGame = () => {
    if (gameOver) return handleGameOver();

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score += 5;
        scoreDisplay.innerText = `Score: ${score}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        const className = i === 0 ? 'head' : 'body';
        html += `<div class="${className}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}">
                    ${i === 0 ? '<div class="eye left"></div><div class="eye right"></div>' : ''}
                  </div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

const showGameOver = () => {
    document.getElementById('final-score').innerText = score;
    document.querySelector('.game-over').style.display = 'block';
};

const restartGame = () => {
    gameOver = false;
    snakeX = 5;
    snakeY = 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    document.querySelector('.game-over').style.display = 'none';
    updateFoodPosition();
    setIntervalId = setInterval(initGame, 130);
};

document.getElementById('restart').addEventListener('click', restartGame);


    playBoard.innerHTML = html;
};


updateFoodPosition();
setIntervalId = setInterval(initGame, 130);

restartButton.addEventListener('click', restartGame);
