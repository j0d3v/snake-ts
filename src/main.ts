import { BOARD_SIZE, Direction, drawBoard, randomPosition } from "./boardUtils";
import Food from "./food";
import Snake from "./snake";

const board = document.getElementById("board") as HTMLCanvasElement;
board.width = BOARD_SIZE;
board.height = BOARD_SIZE;
const ctx = board.getContext("2d")!;

const directions: Map<string, Direction> = new Map([
  ["ArrowUp", Direction.Up],
  ["ArrowDown", Direction.Down],
  ["ArrowLeft", Direction.Left],
  ["ArrowRight", Direction.Right],
]);

const snake = new Snake(ctx);
const food = new Food(randomPosition(), "apple.svg", ctx);

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (!directions.has(event.code)) return;

  const direction = directions.get(event.code)!;

  if (!snake.move(direction)) console.log("Snake is couldn't move");

  // Check if food is eaten
  if (food.collidesWith(snake.currentHead)) {
    let newFoodPos = randomPosition();
    while (snake.collidesWith(newFoodPos)) {
      newFoodPos = randomPosition();
    }
    food.updatePosition(newFoodPos);
    snake.grow();
  }
});

drawBoard(ctx);
