/*
const myName = "your name";

const hello = (userName: string): string => `hello, ${userName}`;

console.log(hello(myName));
*/

import express from "express";

import routes from "./routes/index";
import students from "./routes/api/students";
import teacher from "./routes/api/teachers";

const app = express();
const port = 3000;

// routes
app.use("/api", routes);
app.use("/continents", routes);
app.use("/countries", routes);

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});
