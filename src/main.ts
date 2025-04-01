const board = document.getElementById("board") as HTMLCanvasElement;
board.width = 800;
board.height = 800;
const ctx = board.getContext("2d")!;
const cells = 20;
// Calculate cell side length
const sideLength = Math.floor(board.width / cells);
// Draw the grid
for (let i = 0; i < cells; i++) {
  for (let j = 0; j < cells; j++) {
    ctx.strokeRect(i * sideLength, j * sideLength, sideLength, sideLength);
  }
}
let currentPosition = { x: 0, y: 0 };
ctx.fillRect(0, 0, sideLength, sideLength);
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  // Clear the current cell
  ctx.clearRect(
    currentPosition.x * sideLength,
    currentPosition.y * sideLength,
    sideLength,
    sideLength
  );
  // Redraw the cell border
  ctx.strokeRect(
    currentPosition.x * sideLength,
    currentPosition.y * sideLength,
    sideLength,
    sideLength
  );
  switch (event.code) {
    case "ArrowUp":
      if (currentPosition.y > 0) currentPosition.y--;
      break;
    case "ArrowDown":
      if (currentPosition.y < cells - 1) currentPosition.y++;
      break;
    case "ArrowLeft":
      if (currentPosition.x > 0) currentPosition.x--;
      break;
    case "ArrowRight":
      if (currentPosition.x < cells - 1) currentPosition.x++;
      break;
  }
  let x = currentPosition.x * sideLength;
  let y = currentPosition.y * sideLength;
  // Fill the new cell
  ctx.fillRect(x, y, sideLength, sideLength);
});
