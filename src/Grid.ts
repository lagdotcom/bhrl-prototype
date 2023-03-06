import { Position } from "@app/components";

export default class Grid<T> {
  grid: T[][];

  constructor(
    public width: number,
    public height: number,
    constructorFn: (x: number, y: number) => T
  ) {
    this.grid = [];

    for (let y = 0; y < height; y++) {
      const row: T[] = [];

      for (let x = 0; x < width; x++) row.push(constructorFn(x, y));

      this.grid.push(row);
    }
  }

  contains({ x, y }: Position) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  get({ x, y }: Position) {
    return this.grid[y][x];
  }

  getPositions(): Position[] {
    const positions: Position[] = [];

    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) positions.push({ x, y });

    return positions;
  }
}
