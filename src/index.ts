import express from "express";
import { promises as fsPromises } from "fs";
import csv from "csvtojson";
const sharp = require('sharp');
//import sharp from "sharp";
//import sharp, { Sharp } from 'sharp'

import multer from 'multer';

import routes from "./routes/index";
import pathName from "../utilities/pathName";

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

app.get("*", pathName);
console.log("H*********************ere is my pathName:*********************");
console.log("Here is my pathName:", pathName);
console.log("H*********************ere is my pathName:*********************");




// src="/assets/full/palmtunnel.jpg"
//declare function sharp(): Sharp

// Multer config for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Temporarily save file to 'uploads/'

// Route to upload and resize image
app.post('/assets/full/', upload.single('picture'), async (req, res) => {
  try {
    const filepath = req.file?.path
    
    //.file.path;
    const outputFilename = `resized-${Date.now()}.jpeg`;

    // Use sharp to resize the image
    await sharp(filepath)
      .resize(200, 200) // Resize to 200x200 pixels
      .toFormat('jpeg')
      .jpeg({ quality: 90 }) // Set the quality of the image
      .toFile(`./thumb/${outputFilename}`); // Save the resized image to 'resized/' directory

    res.send(`Image uploaded and resized successfully as ${outputFilename}`);
  } catch (error) {
    console.error('Error processing file', error);
    res.status(500).send('Error processing your file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});






// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
