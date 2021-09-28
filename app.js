const canvas = document.querySelector("canvas");
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
const drawDirection = () => {
  const number = Math.floor(Math.random() * 2);
  if (number === 0) {
    return -1;
  } else {
    return 1;
  }
};

let ballSpeedX = drawDirection();

let ballSpeedY = drawDirection();

const player = () => {
  ctx.fillStyle = "yellowgreen";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
};

const ai = () => {
  ctx.fillStyle = "yellow";
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
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

  if (ballX <= 0 || ballX + ballSize >= cw) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX <= playerX + paddleWidth) {
    if (ballY + ballSize >= playerY && ballY < playerY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      ballX += 5;
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

canvas.addEventListener("mousemove", playerPosition);

const game = () => {
  table();
  ball();
  player();
  ai();
  aiPosition();
};

const indexInterval = setInterval(game, 1000 / 60);
