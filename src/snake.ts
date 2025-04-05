import {
  clearCell,
  Direction,
  fillCell,
  GRID_SIZE,
  Position,
  randomPosition,
} from "./boardUtils";
export default class Snake {
  private length: number;
  private head: Position;
  private segments: Position[];
  private context: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
    this.length = 1;
    this.head = randomPosition();
    this.segments = [this.head];
    fillCell(this.head, this.context);
  }
  get currentHead(): Position {
    return this.head;
  }
  move(direction: Direction) {
    let newHead: Position = { x: this.head.x, y: this.head.y };
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
    }
    // If the new position is not within the board do nothing
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y >= GRID_SIZE
    )
      return false;

    this.head = newHead;
    this.segments.unshift(this.head);

    fillCell(this.head, this.context);

    // If the snake is too long, remove the tail
    if (this.segments.length > this.length) {
      const tail = this.segments.pop();
      if (tail) clearCell(tail, this.context);
    }
    return true;
  }
  collidesWith(other: Position) {
    return this.segments.some((pos) => pos.x === other.x && pos.y === other.y);
  }
  grow() {
    this.length++;
  }
}
