// Increase score when bricks break
// Lose - redraw bricks, reset score

let score = 0;
const brickRowCount = 9;
const brickColCount = 5;

// Create canvas context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  color: "#0095dd",
};

//create paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
  color: "#0095dd",
};

//create bricks
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  color: "#0095dd",
  visible: true,
};
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? brick.color : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

//draw ball on canvas
function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.color;
  ctx.fill();
  ctx.closePath();
}

//draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#0095dd";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Move paddle on canvas
function movePaddle(paddle) {
  paddle.x += paddle.dx;
  //wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//Move Ball
function moveBall(ball) {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall detection
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision
  if (
    //paddle left
    ball.x - ball.size > paddle.x &&
    //paddle right
    ball.x + ball.size < paddle.x + paddle.w &&
    //paddle top
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          //brick left
          ball.x - ball.size > brick.x &&
          //brick right
          ball.x + ball.size < brick.x + brick.w &&
          //brick top
          ball.y + ball.size > brick.y &&
          //brick bottom
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  //Hit floor
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

//Increase the score
function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColCount) === 0) {
    showAllBricks();
  }
}

//Show all bricks after all bricks are broken
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

// draw everythings
function draw(ball, paddle) {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScore();
  drawBricks();
  drawBall(ball);
  drawPaddle(paddle);
}

//update canvas drawing and animation
function update() {
  movePaddle(paddle);
  moveBall(ball);
  draw(ball, paddle);
  requestAnimationFrame(update);
}

//calling functions
update();

//keyboard events
function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === "ArrowRight" ||
    e.key === "Right" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

//Event Listeners

//keyboard event listener
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//show rules
document.getElementById("rules-btn").addEventListener("click", () => {
  document.getElementById("rules").className = "rules show";
});

//close rules
document.getElementById("close-rules-btn").addEventListener("click", () => {
  document.getElementById("rules").className = "rules";
});
