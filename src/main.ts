import {
  BOARD_SIZE,
  clearCell,
  drawBoard,
  drawImage,
  fillCell,
  GRID_SIZE,
  randomPosition,
} from "./boardUtils";
import { PositionQueue } from "./QueueDS";

const board = document.getElementById("board") as HTMLCanvasElement;
board.width = BOARD_SIZE;
board.height = BOARD_SIZE;
const ctx = board.getContext("2d")!;

const food = new Image();
food.src = "/apple.svg";

let headPos = randomPosition();
let foodPos = randomPosition();

const directions: Map<string, number[]> = new Map([
  ["ArrowUp", [0, -1]],
  ["ArrowDown", [0, 1]],
  ["ArrowLeft", [-1, 0]],
  ["ArrowRight", [1, 0]],
]);

const QMovements = new PositionQueue(GRID_SIZE);
let snakeLength = 1;

fillCell(headPos, ctx);

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (!directions.has(event.code)) return;

  let prevPos = { ...headPos };
  const [dx, dy] = directions.get(event.code)!;

  headPos.x += headPos.x + dx >= 0 && headPos.x + dx < GRID_SIZE ? dx : 0;
  headPos.y += headPos.y + dy >= 0 && headPos.y + dy < GRID_SIZE ? dy : 0;

  if (QMovements.contains(headPos)) {
    alert("Game over");
  }
  // Check if food is eaten
  if (headPos.x === foodPos.x && headPos.y === foodPos.y) {
    let tmpPos = randomPosition();
    while (QMovements.contains(tmpPos)) {
      tmpPos = randomPosition();
    }
    foodPos = tmpPos;
    drawImage(food, foodPos, ctx);
    snakeLength++;
  }

  QMovements.enqueue(prevPos);
  fillCell(headPos, ctx);

  // Clearing the tail
  if (QMovements.size() >= snakeLength) {
    const tail = QMovements.dequeue();
    if (tail) clearCell(tail, ctx);
  }
});

drawBoard(ctx);
food.onload = () => drawImage(food, foodPos, ctx);
