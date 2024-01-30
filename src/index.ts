/*
const myName = "your name";

const hello = (userName: string): string => `hello, ${userName}`;

console.log(hello(myName));
*/

import express from "express";

const app = express();

const port = 3000;

app.get("/api", (req, res) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});
