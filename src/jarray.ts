export class JArray<D> extends Array<D> {
  static of<D>(...args: D[]): JArray<D> {
    return new JArray(...args);
  }
  static range(first: number): JArray<number> {
    let arr = new JArray<number>();
    for (let i = 0; i < first; i++) arr.push(i);
    return arr;
  }
  constructor(...args) {
    super(...args);
  }
  map<Z>(fn: (val, index, arr) => Z): JArray<Z> {
    return super.map(fn) as JArray<Z>;
  }
  tap(fn: (val, idnex, arr) => void): JArray<D> {
    this.forEach(fn);
    return this;
  }
  filter(fn: (val, index, arr) => boolean): JArray<D> {
    return super.filter(fn) as JArray<D>;
  }
  pluck(name: keyof D): JArray<any> {
    return this.map((x) => x[name]);
  }
  first(): D {
    return this[0];
  }
  last(): D {
    return this[this.length - 1];
  }
  empty(): boolean {
    return this.length === 0;
  }
}
