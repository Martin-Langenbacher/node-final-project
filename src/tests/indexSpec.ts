import supertest from "supertest";

import app from "../index";
import { myFunc } from "../index";

const request = supertest(app);

describe("Basic tests (for learning purpose)", () => {
  it("Checking the toBe-function: Is it true?", () => {
    const myVar = true;
    expect(myVar).toBe(true);
  });
  it("expect myFunc(5) to equal 25", () => {
    expect(myFunc(5)).toEqual(25);
  });
});

describe("Test endpoint responses", () => {
  it("get the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
  it("the api endpoint EXISTS (200)", async () => {
    const response = await request.get("/api/images?filename=fjord&width=200&height=200");
    expect(response.status).toBe(200);
  });
  it("the api endpoint does NOT exist (500)", async () => {
    const response = await request.get("/api/images?filename=wrongName&width=200&height=200");
    expect(response.status).toBe(500);
  });
});


// http://localhost:3000/api/images?filename=fjord&width=200&height=200



// TODO: More tests: I need one, when in the full folder is the picture, but in the thumb is nothing

// TODO: alternative: Both folders it is there - AND no reload... !!!