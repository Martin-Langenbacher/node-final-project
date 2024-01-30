import express from "express";

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let url = req.url;
  console.log(`${url} was visited (message from logger).`);
  next();
};

export default logger;
