import express from "express";
import path from "path";
import { promises as fsPromises } from "fs";
import csv from "csvtojson";
//const sharp = require("sharp");
import sharp from "sharp";
//import sharp, { Sharp } from 'sharp'

import multer from "multer";

import routes from "./routes/index";
import { pathName, sendImageFile } from "./utilities/pathName";
//import { pathName, sendImage } from './pathName';

const app = express();
const port = 3000;
const IMAGE_DIR = path.join(__dirname, "..", "assets", "full");

// FileSystem - example
const inputFile = "./assets/playground/users.csv";
const outputFile = "./assets/playground/users.json";

// Example:
// define a route handler for the default home page

// TODO: Keep this old index-old.ts file because of the /convert example !!!
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

app.get("/api/images", async (req, res) => {
  // Extracting query parameters
  const filename = req.query.filename;
  const imgWidth =
    typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;
  const imgHeight =
    typeof req.query.height === "string"
      ? parseInt(req.query.height, 10)
      : null;

  //const { filename, width, height } = req.query;

  // Validate input
  if (typeof filename !== "string" || !filename) {
    return res.status(400).send("Filename is required and must be a string");
  }

  // Construct image path
  const imagePath = path.join(IMAGE_DIR, `${filename}.jpg`);

  try {
    // Use sharp for image processing
    let image = sharp(imagePath);

    // Resize image if width and height are provided
    if (imgWidth && imgHeight) {
      image = image.resize(imgWidth, imgHeight);
    }

    // Set the Content-Type header to image/jpeg
    res.type("jpeg");

    // Pipe the processed image to the response
    image.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
});

// Serve static assets from the assets folder
//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// routes
app.use("/api", routes);
//app.use("/continents", routes);
//app.use("/countries", routes);

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});

//app.get("*", pathName);
app.get("/image/:imageName", (req, res) => {
  //app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "assets", "full", imageName);
  sendImageFile(imagePath, res);
});

// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
