export function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function lerp_number(t: number, s: number, e: number): number {
  if (t <= 0) return s;
  if (t >= 1) return e;
  return s + (e - s) * t;
}

export function range(count: number): number[] {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(i);
  }
  return list;
}

export class Point {
  y: number;
  x: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(pt: Point) {
    return new Point(this.x + pt.x, this.y + pt.y);
  }
  subtract(pt: Point) {
    return new Point(this.x - pt.x, this.y - pt.y);
  }
  multiply(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  unit() {
    return this.scale(1 / this.magnitude());
  }
  scale(scale: number): Point {
    return new Point(this.x * scale, this.y * scale);
  }
  distance(pt: Point): number {
    return this.subtract(pt).magnitude();
  }
  floor(): Point {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }
  clamp(min: Point, max: Point): Point {
    let x = this.x;
    if (x < min.x) x = min.x;
    if (x > max.x) x = max.x;
    let y = this.y;
    if (y < min.y) y = min.y;
    if (y > max.y) y = max.y;
    return new Point(x, y);
  }
  lerp(t: number, that: Point): Point {
    return new Point(
      lerp_number(t, this.x, that.x),
      lerp_number(t, this.y, that.y),
    );
  }

  copy() {
    return new Point(this.x, this.y);
  }
  toString() {
    return `Point(${this.x.toFixed(1)},${this.y.toFixed(1)})`;
  }
  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  static fromJSON(point: { x: number; y: number }) {
    return new Point(point.x, point.y);
  }
}

export class Size {
  w: number;
  h: number;
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }
  set(w: number, h: number) {
    this.w = w;
    this.h = h;
  }
  addPoint(pt: Point): Size {
    return new Size(this.w + pt.x, this.h + pt.y);
  }
  scale(scale: number): Size {
    return new Size(this.w * scale, this.h * scale);
  }
  asPoint(): Point {
    return new Point(this.w, this.h);
  }
  growInsets(insets: Insets): Size {
    return new Size(
      this.w + insets.left + insets.right,
      this.h + insets.top + insets.bottom,
    );
  }

  copy(): Size {
    return new Size(this.w, this.h);
  }
  toString() {
    return `Size(${this.w} x ${this.h})`;
  }
  toJSON() {
    return {
      w: this.w,
      h: this.h,
    };
  }
  static fromJSON(size: { w: number; h: number }) {
    return new Size(size.w, size.h);
  }
}

export class Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
  constructor(top: number, right: number, bottom: number, left: number) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
  copy(): Insets {
    return new Insets(this.top, this.right, this.bottom, this.left);
  }
  add(insets: Insets): Insets {
    return new Insets(
      this.top + insets.top,
      this.right + insets.right,
      this.bottom + insets.bottom,
      this.left + insets.left,
    );
  }
  width(): number {
    return this.left + this.right;
  }
  height(): number {
    return this.top + this.bottom;
  }
  isEmpty() {
    return (
      this.left <= 0 && this.right <= 0 && this.top <= 0 && this.bottom <= 0
    );
  }
  toString() {
    return `Insets(${this.top.toFixed(1)}, ${this.right.toFixed(
      1,
    )}, ${this.bottom.toFixed(1)}, ${this.left.toFixed(1)})`;
  }
  toJSON() {
    return {
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
    };
  }
  static from(value: number) {
    return new Insets(value, value, value, value);
  }
  static fromJSON(insets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }) {
    return new Insets(insets.top, insets.right, insets.bottom, insets.left);
  }
}

export class Bounds {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  get x2(): number {
    return this.x + this.w;
  }
  get y2(): number {
    return this.y + this.h;
  }

  top(): number {
    return this.y;
  }
  top_left(): Point {
    return new Point(this.x, this.top());
  }
  top_midpoint(): Point {
    return new Point(this.x + this.w / 2, this.top());
  }
  top_right(): Point {
    return new Point(this.x + this.w, this.top());
  }
  left(): number {
    return this.x;
  }
  left_midpoint(): Point {
    return new Point(this.left(), this.y + this.h / 2);
  }
  bottom(): number {
    return this.y + this.h;
  }
  bottom_left(): Point {
    return new Point(this.x, this.bottom());
  }
  bottom_midpoint(): Point {
    return new Point(this.x + this.w / 2, this.bottom());
  }
  bottom_right(): Point {
    return new Point(this.x + this.w, this.bottom());
  }
  right(): number {
    return this.x + this.w;
  }
  right_midpoint(): Point {
    return new Point(this.right(), this.y + this.h / 2);
  }
  center(): Point {
    return new Point(this.x + this.w / 2, this.y + this.h / 2);
  }
  position(): Point {
    return this.top_left();
  }
  size(): Size {
    return new Size(this.w, this.h);
  }
  set(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  add_self(point: Point) {
    this.x += point.x;
    this.y += point.y;
  }
  add(point: Point) {
    return new Bounds(this.x + point.x, this.y + point.y, this.w, this.h);
  }
  contains(pt: Point): boolean {
    if (pt.x < this.x) return false;
    if (pt.y < this.y) return false;
    if (pt.x > this.x + this.w) return false;
    if (pt.y > this.y + this.h) return false;
    return true;
  }
  intersects(other: Bounds): boolean {
    if (this.left() >= other.right()) return false;
    if (this.right() <= other.left()) return false;
    if (this.top() >= other.bottom()) return false;
    if (this.bottom() <= other.top()) return false;
    return true;
  }
  asInsets(): Insets {
    return new Insets(this.top(), this.right(), this.bottom(), this.left());
  }
  grow(v: number) {
    return new Bounds(this.x - v, this.y - v, this.w + v * 2, this.h + v * 2);
  }
  growInsets(insets: Insets): Bounds {
    return new Bounds(
      this.x - insets.left,
      this.y - insets.top,
      this.w + insets.left + insets.right,
      this.h + insets.top + insets.bottom,
    );
  }
  shrinkInsets(insets: Insets): Bounds {
    return new Bounds(
      this.x + insets.left,
      this.y + insets.top,
      this.w - insets.left - insets.right,
      this.h - insets.top - insets.bottom,
    );
  }
  scale(s: number): Bounds {
    return new Bounds(this.x * s, this.y * s, this.w * s, this.h * s);
  }

  copy(): Bounds {
    return new Bounds(this.x, this.y, this.w, this.h);
  }
  toString() {
    return `Bounds(${this.x.toFixed(1)}, ${this.y.toFixed(
      1,
    )}) x (${this.w.toFixed(1)},${this.h.toFixed(1)})`;
  }
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
    };
  }
  withPosition(point: Point) {
    return new Bounds(point.x, point.y, this.w, this.h);
  }
  withSize(size: Size) {
    return new Bounds(this.x, this.y, size.w, size.h);
  }
  static fromPointSize(point: Point, size: Size) {
    return new Bounds(point.x, point.y, size.w, size.h);
  }
  static fromJSON(bounds: { x: number; y: number; w: number; h: number }) {
    return new Bounds(bounds.x, bounds.y, bounds.w, bounds.h);
  }
}

export const genId = (prefix: string) =>
  `${prefix}_${Math.floor(Math.random() * 1000000)}`;
