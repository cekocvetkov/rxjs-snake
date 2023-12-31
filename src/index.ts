import { distinctUntilChanged, filter, fromEvent, map, scan, tap } from "rxjs";
import { canvas, ctx } from "./canvas";
import "./styles.css";
const DIRECTIONS: { ArrowRight: string; ArrowLeft: string; ArrowUp: string; ArrowDown: string } = {
	ArrowRight: "RIGHT",
	ArrowLeft: "LEFT",
	ArrowUp: "UP",
	ArrowDown: "DOWN",
};
const SEGMENT_SIZE: number = 10;

let DIRECTION: string | undefined;
let SPEED: number = 1;

let firstSegment = { x: 50, y: 50 };
let snake = [firstSegment];

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	const keydown$ = fromEvent(window, "keydown");
	const refresh$ = fromEvent(document.getElementById("refresh")!, "click");
	refresh$.subscribe((e) => refreshGame());
	keydown$
		.pipe(
			map((event: Event) => DIRECTIONS[(event as KeyboardEvent).key as keyof typeof DIRECTIONS]),
			filter((direction) => !!direction),
			// startWith("RIGHT"),
			tap((direction) => (DIRECTION = direction)),
			tap((dir) => console.log(dir)),
			scan(nextDirection),
			distinctUntilChanged()
		)
		.subscribe();

	main();
});

function nextDirection() {}

function refreshGame() {
	DIRECTION = undefined;
	firstSegment = { x: 50, y: 50 };
	snake = [firstSegment];
	main();
}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (gameOver()) {
		ctx.fillStyle = "pink";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "red";
		ctx.font = "48px serif";
		const text = ctx.measureText("Game Over"); // TextMetrics object
		ctx.fillText("Game Over", canvas.width - canvas.width / 2 - text.width / 2, canvas.height - canvas.height / 2);
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

	if (DIRECTION === "UP") {
		snake[snake.length - 1].y -= SEGMENT_SIZE;
	}
	if (DIRECTION === "DOWN") {
		snake[snake.length - 1].y += SEGMENT_SIZE;
	}
	if (DIRECTION === "LEFT") {
		snake[snake.length - 1].x -= SEGMENT_SIZE;
	}
	if (DIRECTION === "RIGHT") {
		snake[snake.length - 1].x += SEGMENT_SIZE;
	}
}

function gameOver() {
	const snakeHead = snake[snake.length - 1];
	if (snakeHead.x < 0 || snakeHead.x > canvas.width || snakeHead.y < 0 || snakeHead.y > canvas.height) {
		return true;
	}
}
