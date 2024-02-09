"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe("Basic tests (for learning purpose)", () => {
    it("Checking the toBe-test with a simple variable, which is true", () => {
        const myVar = true;
        expect(myVar).toBe(true);
    });
    it("expect myFunc(5) to equal 25", () => {
        expect((0, index_1.myFunc)(5)).toEqual(25);
    });
});
