"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_1 = __importDefault(require("./api/students"));
const teachers_1 = __importDefault(require("./api/teachers"));
const logger_1 = __importDefault(require("../utilities/logger"));
const path_1 = __importDefault(require("path"));
const routes = express_1.default.Router();
routes.get('/', logger_1.default, (req, res) => {
    // res.send("Main api route *** !");
    res.sendFile(path_1.default.join(__dirname, '../../src/views/index.html'));
});
routes.use('/teachers', logger_1.default, teachers_1.default);
routes.use('/students', logger_1.default, students_1.default);
exports.default = routes;
// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
