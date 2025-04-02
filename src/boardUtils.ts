import { Position } from "./QueueDS";

const GRID_SIZE = 10;
const BOARD_SIZE = 800;
const CELL_SIZE = Math.floor(BOARD_SIZE / GRID_SIZE);

function fillCell(position: Position, ctx: CanvasRenderingContext2D): void {
  ctx.fillRect(
    position.x * CELL_SIZE,
    position.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

function clearCell(position: Position, ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(
    position.x * CELL_SIZE,
    position.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
  ctx.strokeRect(
    position.x * CELL_SIZE,
    position.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}
function drawImage(
  img: HTMLImageElement,
  position: Position,
  ctx: CanvasRenderingContext2D
) {
  ctx.drawImage(
    img,
    position.x * CELL_SIZE - CELL_SIZE / 2,
    position.y * CELL_SIZE - CELL_SIZE / 2,
    CELL_SIZE * 2,
    CELL_SIZE * 2
  );
}
function drawBoard(ctx: CanvasRenderingContext2D): void {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
function randomPosition(): Position {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}
export {
  fillCell,
  clearCell,
  drawImage,
  drawBoard,
  GRID_SIZE,
  CELL_SIZE,
  BOARD_SIZE,
  randomPosition,
};
