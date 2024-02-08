import express from "express";
import path from "path";
import sharp from "sharp";

import multer from "multer";

import routes from "./routes/index";
import { pathName, sendImageFile, getImage } from "../utilities/pathName";
import { saveResizedImage } from "../utilities/savePicture";

const app = express();
const port = 3000;
const IMAGE_DIR = path.join(__dirname, "..", "assets", "full");

app.get("/api/images", async (req, res) => {
  // Extracting query parameters
  const filename = req.query.filename;
  const imgWidth =
    typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;
  const imgHeight =
    typeof req.query.height === "string"
      ? parseInt(req.query.height, 10)
      : null;

  // TODO: Validate input --> More validation needed (in case the filename is wrong, ...)
  /*
  if (typeof filename !== "string" || !filename) {
    return res.status(400).send("Filename is required and must be a string");
  } */

  if (!filename || imgWidth === null || imgHeight === null) {
    return res
      .status(400)
      .send("Missing required query parameters: filename, width, and height.");
  }

  // Construct image path
  const imagePath = path.join(IMAGE_DIR, `${filename}.jpg`);
  //const outputFilename = `${filename}-${imgWidth}x${imgHeight}.jpg`;
  const outputFilename = `${filename}_thumb.jpg`;

  try {
    const outputPath = await saveResizedImage(
      imagePath,
      imgWidth,
      imgHeight,
      outputFilename
    );
    res.sendFile(outputPath);
  } catch (error) {
    res.status(500).send("Error processing the image");
  }
  // getImage(imagePath, imgWidth!, imgHeight!, res);
});

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});

// Serve static assets from the assets folder
//app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// routes
app.use("/api", routes);
//app.use("/continents", routes);
//app.use("/countries", routes);

console.log("H*********************ere is my pathName:*********************");
console.log("Here is my pathName:", pathName);
console.log("H*********************ere is my pathName:*********************");

// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
