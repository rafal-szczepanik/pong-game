const canvas = document.querySelector("canvas");
const restartBtn = document.querySelector(".restart-btn");
const newGameBtn = document.querySelector(".newgame-btn");
const scores = document.querySelector(".result");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;

let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;
const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let results = { player: 0, ai: 0 };

let indexInterval;

const drawDirection = () => {
  const number = Math.floor(Math.random() * 2);
  if (number === 0) {
    return -2;
  } else {
    return 2;
  }
};

let ballSpeedX = drawDirection();

let ballSpeedY = drawDirection();

const player = () => {
  ctx.fillStyle = "yellowgreen";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  if (ballX <= playerX + paddleWidth) {
    if (
      ballY + ballSize / 2 >= playerY &&
      ballY + ballSize / 2 < playerY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
      ballX += 5;
    }
  }
};

const ai = () => {
  ctx.fillStyle = "yellow";
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
  if (ballX >= aiX - paddleWidth) {
    if (
      ballY + ballSize / 2 >= aiY &&
      ballY + ballSize / 2 < aiY + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
      ballX -= 5;
    }
  }
};

const ball = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballY <= 0 || ballY + ballSize >= ch) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }

  if (ballX <= 0) {
    results.ai += 1;
    console.log(results);
    nextRound();
    if (results.ai === 3) {
      scores.innerText = `${results.player} : ${results.ai} Player lost the game`;
      endGame();
    }
  } else if (ballX + ballSize >= cw) {
    results.player += 1;
    nextRound();
    if (results.player === 3) {
      scores.innerText = `${results.player} : ${results.ai} Player won the game`;
      endGame();
    }
  }
};
const table = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);

  for (let linePosition = 20; linePosition < ch; linePosition += 30) {
    ctx.fillStyle = "white";
    ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
  }
};

const result = () => {
  ctx.fillStyle = "red";
};

const topCanvas = canvas.offsetTop;
// const leftCanvas = canvas.offsetLeft;

const playerPosition = (e) => {
  playerY = e.clientY - topCanvas - paddleHeight / 2;

  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddleHeight) {
    playerY = ch - paddleHeight;
  }
};

const speedUp = () => {
  if (ballSpeedX > 0 && ballSpeedX < 16) {
    ballSpeedX += 0.4;
  } else if (ballSpeedX < 0 && ballSpeedX > -16) {
    ballSpeedX -= 0.4;
  }

  if (ballSpeedY > 0 && ballSpeedY < 16) {
    ballSpeedY += 0.3;
  } else if (ballSpeedY < 0 && ballSpeedY > -16) {
    ballSpeedY -= 0.3;
  }
};
const aiPosition = () => {
  const middlePaddle = aiY + paddleHeight / 2;
  const middleBall = ballY + ballSize / 2;

  if (ballX > 500) {
    if (middlePaddle - middleBall > 200) {
      aiY -= 20;
    } else if (middlePaddle - middleBall > 50) {
      aiY -= 10;
    } else if (middlePaddle - middleBall < -200) {
      aiY += 20;
    } else if (middlePaddle - middleBall < -50) {
      aiY += 10;
    }
  } else if (ballX <= 500 && ballX > 150) {
    if (middlePaddle - middleBall > 100) {
      aiY -= 3;
    } else if (middlePaddle - middleBall < -100) {
      aiY += 3;
    }
  }
};

const nextRound = () => {
  ballSpeedX = drawDirection();
  ballSpeedY = drawDirection();
  ballX = cw / 2 - ballSize / 2;
  ballY = ch / 2 - ballSize / 2;
  playerY = 200;
  aiY = 200;
  scores.innerText = `${results.player} : ${results.ai}`;
};

canvas.addEventListener("mousemove", playerPosition);

const game = () => {
  table();
  ball();
  player();
  ai();
  aiPosition();
};

const endGame = () => {
  clearInterval(indexInterval);
  newGameBtn.classList.remove("visible");
};

const restartGame = () => {
  results = { player: 0, ai: 0 };
  nextRound();
};
const startGame = () => {
  restartGame();
  indexInterval = setInterval(game, 1000 / 60);
  newGameBtn.classList.add("visible");
};

newGameBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
game();
