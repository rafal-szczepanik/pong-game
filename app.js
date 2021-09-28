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
};
const table = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  for (let linePosition = 20; linePosition < ch; linePosition += 30) {
    ctx.fillStyle = "white";

    ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
  }
};

table();
ball();
player();
ai();
