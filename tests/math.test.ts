import { describe, expect, it } from "vitest";
import {Bounds, Insets, Point, Size} from "../src/math";

describe("inset tests", () => {
  it("can add insets to eachother", () => {
    console.log("yo");
    const ins = new Insets(1, 2, 3, 4);
    const insa = new Insets(5, 6, 7, 8);
    const insb = ins.add(insa);
    expect(insb).toEqual(new Insets(6, 8, 10, 12));
  });
  it('can create a bounds from a point and a size', () => {
    const bds = Bounds.fromPointSize(new Point(1,2), new Size(3,4))
    expect(bds).toStrictEqual(new Bounds(1,2,3,4))
  })
});
describe("Size", () => {
  it("can do Size.floor()", () => {
    const size = new Size(22.5,33.8)
    expect(size.floor()).toEqual(new Size(22,33))
  })
})
