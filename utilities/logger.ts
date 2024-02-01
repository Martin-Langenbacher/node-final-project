import express from "express";

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  //let url = req.url;
  let baseUrl = req.baseUrl;
  //console.log(`${url} was visited (message from logger).`);
  console.log(`${baseUrl} was visited (baseUrl --> message from logger).`);
  next();
};

export default logger;
