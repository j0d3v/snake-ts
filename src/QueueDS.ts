export type Position = {
  x: number;
  y: number;
};
interface Queue<T> {
  items: Array<T>;
  capacity: number;
  size(): number;
  enqueue(item: T): void;
  dequeue(): T | undefined;
  isEmpty(): boolean;
  contains(other: Position): boolean;
}
export class PositionQueue implements Queue<Position> {
  items: Position[] = [];
  capacity: number;

  constructor(cap: number) {
    this.capacity = cap;
  }
  enqueue(item: Position): void {
    if (this.size() < this.capacity) this.items.push(item);
    else console.error("The stack capacity has been exceeded.");
  }
  dequeue(): Position | undefined {
    return this.items.shift();
  }
  size(): number {
    return this.items.length;
  }
  isEmpty(): boolean {
    return this.items.length == 0;
  }
  contains(other: Position): boolean {
    return this.items.some((pos) => pos.x == other.x && pos.y == other.y);
  }
}
