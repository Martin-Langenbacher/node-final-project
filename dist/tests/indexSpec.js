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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const index_2 = require("../index");
const request = (0, supertest_1.default)(index_1.default);
describe("*** Basic tests (for learning purpose)", () => {
    it("1) Checking the toBe-function: Is it true?", () => {
        const myVar = true;
        expect(myVar).toBe(true);
    });
    it("2) expect myFunc(5) to equal 25", () => {
        expect((0, index_2.myFunc)(5)).toEqual(25);
    });
});
describe("*** Test endpoint responses: Test for the final project!", () => {
    const testWidth = 213;
    const testHeight = 217;
    const testPictureName = "fjord";
    const testFileName = `${testPictureName}-${testWidth}x${testHeight}.jpg`;
    const testPath = `/api/images?filename=${testPictureName}&width=${testWidth}&height=${testHeight}`;
    const imagePath = path_1.default.join(__dirname, `../../assets/thumb/${testFileName}`);
    it("3) get the /api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api");
        expect(response.status).toBe(200);
    }));
    it("4) the api endpoint EXISTS (200): /api/images?filename=fjord&width=200&height=200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    }));
    it("5) file exist: fjord-200x200.jpg", () => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the image file was saved correctly
        const fileExists = fs_1.default.existsSync(path_1.default.join(__dirname, `../assets/thumb/fjord-200x200.jpg`));
        expect(fileExists).toBe(true);
    }));
    it(`6) the api endpoint EXISTS (200): ${testPath}`, () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`${testPath}`);
        expect(response.status).toBe(200);
        // Check if the image file was saved correctly
        const fileExists2 = fs_1.default.existsSync(imagePath);
        expect(fileExists2).toBe(true);
    }));
    it("7) the api endpoint height is missing: /api/images?filename=fjord&width=200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord&width=200");
        expect(response.text).toBe("Missing required query parameters: filename, width, and height.");
    }));
    // Cleanup after the test
    afterEach(() => {
        if (fs_1.default.existsSync(imagePath)) {
            fs_1.default.unlinkSync(imagePath);
        }
    });
    it("8) the api endpoint does NOT exist (500): /api/images?filename=wrongName&width=200&height=200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=wrongName&width=200&height=200");
        expect(response.status).toBe(500);
    }));
});
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
// TODO: More tests: I need one, when in the full folder is the picture, but in the thumb is nothing
// TODO: alternative: Both folders it is there - AND no reload... !!!
