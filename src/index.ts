import express from "express";
import { promises as fsPromises } from "fs";
import csv from "csvtojson";

import routes from "./routes/index";

const app = express();
const port = 3000;

// FileSystem - example
const inputFile = "./assets/playground/users.csv";
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

app.use("/assets", express.static("assets"));

// routes
app.use("/api", routes);
//app.use("/continents", routes);
//app.use("/countries", routes);

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});

// ============================================================
app.get("*", (req, res) => {
  // req.protocol gives you the protocol (http or https)
  const protocol = req.protocol;

  // req.get('host') gives you the host (e.g., localhost:3000 or www.example.com)
  const host = req.get("host");

  // req.originalUrl gives you the full path (e.g., /path?search=query)
  const path = req.originalUrl;

  // Combine them to reconstruct the full URL
  const fullUrl = `${protocol}://${host}${path}`;

  console.log("User requested URL:", fullUrl);

  // Respond to the client
  res.send(`You requested URL: ${fullUrl}`);

  // Accessing query parameters
  const filename = req.query.filename; // 'fjord'
  // Check if req.query.width is a string and is not undefined, then parse it
  const width =
    typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;

  // Do a similar check for height if needed
  const height =
    typeof req.query.height === "string"
      ? parseInt(req.query.height, 10)
      : null;

  // Now you can use `width` and `height` in your logic
  // Make sure to check if they are not null (which means the parsing was successful)
  if (width === null || height === null) {
    console.log("ERROR _______________________________ !!!");
    //return res.status(400).send("Missing or invalid width or height");
  }

  console.log(
    `Requested filename: ${filename}, width: ${width}, height: ${height}`
  );
});
