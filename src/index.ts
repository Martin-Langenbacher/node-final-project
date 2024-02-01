/*
const myName = "your name";

const hello = (userName: string): string => `hello, ${userName}`;

console.log(hello(myName));
*/

import express from "express";
import { promises as fsPromises } from "fs";
import csv from "csvtojson";

import routes from "./routes/index";

const app = express();
const port = 3000;

// FileSystem - example
const inputFile = './assets/playground/users.csv'

//../../NodeUdacityFinalProject/assets/playground/users.csv";
const outputFile = "./assets/playground/users.json";

// Example:
// define a route handler for the default home page
app.get("/convert", (req, res) => {
  res.send("converting in process!");
  csv()
    .fromFile(inputFile)
    .then((data) => {
      console.log("AFTER input file");
      return data;
    })
    .then((data) => {
      let newData = data.map(
        (item: { first_name: string; last_name: string; phone: string }) => {
          let first = item.first_name;
          let last = item.last_name;
          let phone = item.phone;
          if (item.phone === "") {
            phone = "missing data";
          }
          return { first, last, phone };
        }
      );
      fsPromises.writeFile(outputFile, JSON.stringify(newData));
    });
});

// routes
app.use("/api", routes);
//app.use("/continents", routes);
//app.use("/countries", routes);

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});
