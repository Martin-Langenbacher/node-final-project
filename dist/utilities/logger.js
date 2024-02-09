"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    //let url = req.url;
    let baseUrl = req.baseUrl;
    //console.log(`${url} was visited (message from logger).`);
    console.log(`${baseUrl} was visited (baseUrl --> message from logger).`);
    next();
};
exports.default = logger;
