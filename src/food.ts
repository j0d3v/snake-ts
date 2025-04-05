import { drawImage, Position } from "./boardUtils";

export default class Food {
  private position: Position;
  private img: HTMLImageElement;
  private context: CanvasRenderingContext2D;
  constructor(
    position: Position,
    source: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.position = position;
    this.context = ctx;
    this.img = new Image();
    this.img.src = source;
    this.img.onload = () => this.draw(this.position);
  }
  collidesWith(other: Position): boolean {
    return this.position.x === other.x && this.position.y === other.y;
  }
  draw(pos: Position) {
    drawImage(this.img, pos, this.context);
  }
}
