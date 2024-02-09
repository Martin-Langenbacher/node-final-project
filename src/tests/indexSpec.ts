import { myFunc } from "../index";

describe("Basic tests (for learning purpose)", () => {
  it("Checking the toBe-function: Is it true?", () => {
    const myVar = true;
    expect(myVar).toBe(true);
  });
  it("expect myFunc(5) to equal 25", () => {
    expect(myFunc(5)).toEqual(25);
  });
});
