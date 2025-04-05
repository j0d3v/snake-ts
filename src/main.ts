import {
  BOARD_SIZE,
  Direction,
  drawBoard,
  drawImage,
  randomPosition,
} from "./boardUtils";
import Snake from "./snake";

const board = document.getElementById("board") as HTMLCanvasElement;
board.width = BOARD_SIZE;
board.height = BOARD_SIZE;
const ctx = board.getContext("2d")!;

const food = new Image();
food.src = "/apple.svg";

let foodPos = randomPosition();

const directions: Map<string, Direction> = new Map([
  ["ArrowUp", Direction.Up],
  ["ArrowDown", Direction.Down],
  ["ArrowLeft", Direction.Left],
  ["ArrowRight", Direction.Right],
]);

const snake = new Snake(ctx);

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (!directions.has(event.code)) return;

  const direction = directions.get(event.code)!;

  // Check if food is eaten
  if (snake.head.x === foodPos.x && snake.head.y === foodPos.y) {
    let tmpPos = randomPosition();
    while (snake.collidesWith(tmpPos)) {
      tmpPos = randomPosition();
    }
    foodPos = tmpPos;
    drawImage(food, foodPos, ctx);
    snake.grow();
  }
  if (snake.move(direction)) {
    console.log("Snake is moving ...");
  } else console.log("Snake is couldn't move");
});

drawBoard(ctx);
food.onload = () => drawImage(food, foodPos, ctx);
