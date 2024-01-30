import express from "express";

import students from "./api/students";
import teachers from "./api/teachers";
import logger from "../../utilities/logger";

const routes = express.Router();

routes.get("/", logger, (req: express.Request, res: express.Response): void => {
  res.send("Main api route *** !");
});

routes.use("/teachers", logger, teachers);
routes.use("/students", students);

export default routes;
