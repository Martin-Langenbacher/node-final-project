"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const doesFileExist = (filename, OUTPUT_DIR) => {
    const filePath = path_1.default.join(OUTPUT_DIR, filename);
    return fs_1.default.existsSync(filePath);
};
exports.default = doesFileExist;
