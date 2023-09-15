
let canvas;
let ctx;
let DIRECTION;
let SPEED = 1;

const SEGMENT_SIZE = 10;
let firstSegment = { x: 50, y: 50 };
let snake = [firstSegment];

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the canvas element
  canvas = document.getElementById("snake-canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    const keydown$ = rxjs.fromEvent(window, 'keydown');
    const refresh$ = rxjs.fromEvent(document.getElementById('refresh'), 'click');
    refresh$.subscribe(e => refreshGame());
    keydown$.subscribe(e => captureKeys(e))

    main();

  } else {
    // Canvas is not supported
    alert("Canvas is not supported in your browser.");
  }
});

function refreshGame() {
  DIRECTION = undefined;
  firstSegment = { x: 50, y: 50 };
  snake = [firstSegment];
  main();
}

function captureKeys(e) {
  console.log(e)
  console.log(e.key)
  if (e.key === 'ArrowRight') {
    DIRECTION = 'RIGHT'
  }
  if (e.key === 'ArrowLeft') {
    DIRECTION = 'LEFT'
  }
  if (e.key === 'ArrowUp') {
    DIRECTION = 'UP'
  }
  if (e.key === 'ArrowDown') {
    DIRECTION = 'DOWN'
  }
}


function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver()) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = "48px serif";
    const text = ctx.measureText("Game Over"); // TextMetrics object
    ctx.fillText("Game Over", canvas.width - (canvas.width / 2) - (text.width / 2), canvas.height - (canvas.height / 2));
    return;
  }

  moveSnake();
  drawSnake();

  requestAnimationFrame(main);


}

function drawSnake() {
  for (const s of snake) {
    ctx.fillStyle = "red";
    ctx.fillRect(s.x, s.y, SEGMENT_SIZE, SEGMENT_SIZE);
  }
}

function moveSnake() {
  if (!DIRECTION) {
    return;
  }

  if (DIRECTION === 'UP') {
    snake[snake.length - 1].y -= SEGMENT_SIZE;
  }
  if (DIRECTION === 'DOWN') {
    snake[snake.length - 1].y += SEGMENT_SIZE;
  }
  if (DIRECTION === 'LEFT') {
    snake[snake.length - 1].x -= SEGMENT_SIZE;
  }
  if (DIRECTION === 'RIGHT') {
    snake[snake.length - 1].x += SEGMENT_SIZE;
  }
}

function gameOver() {
  const snakeHead = snake[snake.length - 1];
  if (snakeHead.x < 0 || snakeHead.x > canvas.width || snakeHead.y < 0 || snakeHead.y > canvas.height) {
    return true;
  }
}