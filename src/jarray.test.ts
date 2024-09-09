import { describe, expect, it, assert } from "vitest";
import { JArray } from "./jarray";
import { Point } from "./index";

describe("JArray", () => {
  it("is an instance of Array", () => {
    let arr = JArray.of<number>(1, 8, 42, 99, -6);
    assert.isTrue(arr instanceof JArray);
    assert.isTrue(arr instanceof Array);
  });
  it("has first and last accessors", () => {
    let arr = JArray.of(1, 8, 42, 99, -6);
    assert.equal(arr.first(), 1);
    assert.equal(arr.last(), -6);
    assert.equal(arr.length, 5);
    assert.equal(arr.empty(), false);
  });
  it("uses the subclass for map and filter", () => {
    let arr: JArray<number> = JArray.of(1, 8, 42, 99, -6);
    let arr2 = arr.map((x) => x * 2);
    assert.equal(arr2.first(), 2);
    let arr3 = arr.filter((x) => x > 0);
    assert.equal(arr3.last(), 99);
  });
  it("can pluck an x or y", () => {
    let arr = JArray.of(new Point(10, -5), new Point(20, 30));
    let arr2 = arr.pluck("x");
    assert.equal(arr2.first(), 10);
  });
  it("can make a range", () => {
    let arr = JArray.range(5);
    assert.equal(arr.length, 5);
    assert.equal(arr.first(), 0);
    assert.equal(arr.last(), 4);
  });
  it("can do a tap", () => {
    let arr = JArray.range(5);
    let arr2 = arr
      .map((x) => x * 2)
      .tap((x) => console.log("x is", x))
      .filter((x) => x >= 3);
    assert.equal(arr2.first(), 4);
    assert.equal(arr2.last(), 8);
  });
});
