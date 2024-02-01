import express from "express";

import students from "./api/students";
import teachers from "./api/teachers";
import logger from "../../utilities/logger";
import path from "path";

const routes = express.Router();

routes.get("/", logger, (req: express.Request, res: express.Response): void => {
  // res.send("Main api route *** !");
  res.sendFile(path.join(__dirname, '../../views/index.html'))
});

routes.use("/teachers", logger, teachers);
routes.use("/students", logger, students);

export default routes;

// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200