import express, { NextFunction } from 'express';

const logger = (req: express.Request, res: express.Response, next: NextFunction): void => {
  const baseUrl = req.baseUrl;
  console.log(`${baseUrl} was visited (baseUrl --> message from logger).`);
  next();
};

export default logger;
