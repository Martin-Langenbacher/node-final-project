"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const baseUrl = req.baseUrl;
    console.log(`${baseUrl} was visited (baseUrl --> message from logger).`);
    next();
};
exports.default = logger;
