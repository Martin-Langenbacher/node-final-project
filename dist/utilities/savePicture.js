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
exports.saveResizedImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const OUTPUT_DIR = path_1.default.join(__dirname, '..', '..', 'assets', 'thumb');
// Ensure the output directory exists
if (!fs_1.default.existsSync(OUTPUT_DIR)) {
    fs_1.default.mkdirSync(OUTPUT_DIR, { recursive: true });
}
const saveResizedImage = (imagePath, imgWidth, imgHeight, outputFilename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const outputPath = path_1.default.join(OUTPUT_DIR, outputFilename);
        yield (0, sharp_1.default)(imagePath).resize(imgWidth, imgHeight).toFile(outputPath);
        return outputPath;
    }
    catch (error) {
        console.error('Error resizing and saving image:', error);
        throw error;
    }
});
exports.saveResizedImage = saveResizedImage;
