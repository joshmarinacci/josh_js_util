import { describe, expect, it } from "vitest";
import { Insets } from "../src/math";

describe("inset tests", () => {
  it("can add insets to eachother", () => {
    console.log("yo");
    const ins = new Insets(1, 2, 3, 4);
    const insa = new Insets(5, 6, 7, 8);
    const insb = ins.add(insa);
    expect(insb).toEqual(new Insets(6, 8, 10, 12));
  });
});
