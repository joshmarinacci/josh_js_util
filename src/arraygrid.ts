import { Point, Size } from "./math.js";

export class ArrayGrid<C> {
  w: number;
  h: number;
  data: C[];

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.data = [];
  }

  set_at(x: number, y: number, value: C): void {
    if (x < 0) return undefined;
    if (y < 0) return undefined;
    if (x >= this.w) return undefined;
    if (y >= this.h) return undefined;
    let n = y * this.w + x;
    this.data[n] = value;
  }
  set(n: Point, value: C): void {
    this.set_at(n.x, n.y, value);
  }

  get_at(x: number, y: number): C {
    if (x < 0) {
      // @ts-ignore
      return undefined;
    }
    if (y < 0) {
      // @ts-ignore
      return undefined;
    }
    if (x >= this.w) {
      // @ts-ignore
      return undefined;
    }
    if (y >= this.h) {
      // @ts-ignore
      return undefined;
    }
    let n = y * this.w + x;
    return this.data[n];
  }
  get(n: Point): C {
    return this.get_at(n.x, n.y);
  }

  isValidIndex(pt: Point) {
    if (pt.x < 0) return false;
    if (pt.y < 0) return false;
    if (pt.x >= this.w) return false;
    if (pt.y >= this.h) return false;
    return true;
  }

  forEach(cb: (value: C, index: Point) => void) {
    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        let value = this.get_at(i, j);
        cb(value, new Point(i, j));
      }
    }
  }
  fill(cb: (index: Point) => C) {
    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        let v: C = cb(new Point(i, j));
        this.set_at(i, j, v);
      }
    }
  }
  size() {
    return this.data.length;
  }

  set_from_list(list: C[]) {
    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        let n = this.w * j + i;
        this.set_at(i, j, list[n]);
      }
    }
  }

  static fromPattern<C>(
    pattern: string,
    cb: (ch: string, index: Point) => C,
  ): ArrayGrid<C> {
    let lines = pattern
      .trim()
      .split("\n")
      .map((l) => l.trim());
    let h = lines.length;
    let w = lines[0].length;
    let grid = new ArrayGrid<C>(w, h);
    let y = 0;
    for (let line of lines) {
      line = line.trim();
      let x = 0;
      for (let ch of line) {
        grid.set_at(x, y, cb(ch, new Point(x, y)));
        // let cell = grid.get_cell(x,y)
        // items.push(cb(ch,new Point(x,y)))
        x++;
      }
      y++;
    }
    return grid;
  }

  static fromSize<C>(size: Size): ArrayGrid<C> {
    return new ArrayGrid<C>(size.w, size.h);
  }

  static fromArray<C>(size: Size, array: C[]): ArrayGrid<C> {
    let grid = ArrayGrid.fromSize<C>(size);
    grid.fill((pt) => {
      let n = pt.x + pt.y * size.w;
      return array[n];
    });
    return grid;
  }
}
