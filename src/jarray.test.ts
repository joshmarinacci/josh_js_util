import { assert } from "chai";
import {JArray} from "./jarray";


describe("it should be an instance of JArray", () => {
    it("can do stuff",() => {
        let arr = new JArray()

        assert.isTrue(arr instanceof JArray)
    })
})

