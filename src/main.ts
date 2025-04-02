import {
  BOARD_SIZE,
  clearCell,
  drawBoard,
  drawImage,
  fillCell,
  GRID_SIZE,
  randomPosition,
} from "./boardUtils";

const board = document.getElementById("board") as HTMLCanvasElement;
board.width = BOARD_SIZE;
board.height = BOARD_SIZE;
const ctx = board.getContext("2d")!;

let currentPosition = randomPosition();
let foodPosition = randomPosition();
fillCell(currentPosition, ctx);
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  clearCell(currentPosition, ctx);
  switch (event.code) {
    case "ArrowUp":
      if (currentPosition.y > 0) currentPosition.y--;
      break;
    case "ArrowDown":
      if (currentPosition.y < GRID_SIZE - 1) currentPosition.y++;
      break;
    case "ArrowLeft":
      if (currentPosition.x > 0) currentPosition.x--;
      break;
    case "ArrowRight":
      if (currentPosition.x < GRID_SIZE - 1) currentPosition.x++;
      break;
  }
  if (
    currentPosition.x == foodPosition.x &&
    currentPosition.y == foodPosition.y
  ) {
    foodPosition = randomPosition();
    drawImage(food, foodPosition, ctx);
  }
  fillCell(currentPosition, ctx);
});
drawBoard(ctx);
const food = new Image();
food.src = "/apple.svg";
food.onload = () => drawImage(food, foodPosition, ctx);
