import { BOARD_SIZE, Direction, drawBoard, randomPosition } from "./boardUtils";
import Food from "./food";
import Snake from "./snake";

const board = document.getElementById("board") as HTMLCanvasElement;
board.width = BOARD_SIZE;
board.height = BOARD_SIZE;
const ctx = board.getContext("2d")!;
const FOOD_IMAGE_SRC = "apple.svg";

const directions: Map<string, Direction> = new Map([
  ["ArrowUp", Direction.Up],
  ["ArrowDown", Direction.Down],
  ["ArrowLeft", Direction.Left],
  ["ArrowRight", Direction.Right],
]);

let food: Food;
let snake: Snake;

const initGame = () => {
  food = new Food(randomPosition(), FOOD_IMAGE_SRC, ctx);
  snake = new Snake(ctx);
  drawBoard(ctx);
  snake.draw();
  food.draw();
};

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (!directions.has(event.code)) return;

  const direction = directions.get(event.code)!;

  if (!snake.move(direction)) {
    alert("Game over !");
    initGame();
  }

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

initGame();
