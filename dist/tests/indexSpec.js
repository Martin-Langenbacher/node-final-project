"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const index_2 = require("../index");
const request = (0, supertest_1.default)(index_1.default);
describe("Basic tests (for learning purpose)", () => {
    it("Checking the toBe-function: Is it true?", () => {
        const myVar = true;
        expect(myVar).toBe(true);
    });
    it("expect myFunc(5) to equal 25", () => {
        expect((0, index_2.myFunc)(5)).toEqual(25);
    });
});
describe("Test endpoint responses", () => {
    it("get the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api");
        expect(response.status).toBe(200);
    }));
    it("the api endpoint EXISTS (200)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    }));
    it("the api endpoint does NOT exist (500)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=wrongName&width=200&height=200");
        expect(response.status).toBe(500);
    }));
});
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
