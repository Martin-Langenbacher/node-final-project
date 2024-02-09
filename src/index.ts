import express from "express";
import path from "path";

import routes from "./routes/index";
import { pathName } from "./utilities/pathName";
import { saveResizedImage } from "./utilities/savePicture";
import doesFileExist from "./utilities/doesFileExist";

const app = express();
const port = 3000;
const FULL_IMAGE_DIR = path.join(__dirname, "..", "assets", "full");
const THUMB_IMAGE_DIR = path.join(__dirname, "..", "assets", "thumb");

app.get("/api/images", async (req, res) => {
  // Extracting query parameters
  const filename = req.query.filename;
  const imgWidth =
    typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;
  const imgHeight =
    typeof req.query.height === "string"
      ? parseInt(req.query.height, 10)
      : null;
  if (typeof filename !== "string" || !filename || !imgWidth || !imgHeight) {
    return res
      .status(400)
      .send("Missing required query parameters: filename, width, and height.");
  }

  // Construct image path
  const fullImagePath = path.join(FULL_IMAGE_DIR, `${filename}.jpg`);
  const thumbImagePath = path.join(
    THUMB_IMAGE_DIR,
    `${filename}-${imgWidth}x${imgHeight}.jpg`
  );

  const imagePath = path.join(FULL_IMAGE_DIR, `${filename}.jpg`);
  const outputFilename = `${filename}-${imgWidth}x${imgHeight}.jpg`;

  const fileExistInThumb = await doesFileExist(outputFilename, THUMB_IMAGE_DIR);

  const fileExistOriginal = await doesFileExist(
    `${filename}.jpg`,
    FULL_IMAGE_DIR
  );

  console.log("------> File exist in Thumb? -->", fileExistInThumb);
  console.log("------> File exist (original)? -->", fileExistOriginal);
  if (fileExistInThumb) {
    return res.status(200).sendFile(thumbImagePath);
  } else {
    if (fileExistOriginal) {
      try {
        const outputPath = await saveResizedImage(
          imagePath,
          imgWidth,
          imgHeight,
          outputFilename
        );
        res.sendFile(outputPath);
      } catch (error) {
        res.status(500).send("Error processing the image (index)");
      }
    } else {
      console.log("SORRY: File does not exist. ------>  filename is wrong!");
      res.status(500).sendFile(path.join(__dirname, "../src/views/error.html"));
    }
  }
});

//app.use('/assets', express.static('../assets/full/'));
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "assets", "full"))
);

// start the Express server:
app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});

// routes
app.use("/api", routes);
//app.use("/continents", routes);
//app.use("/countries", routes);

// TODO: Look deeper in this one - understanding the flow better!
console.log("H*********************ere is my pathName:*********************");
console.log("Here is my pathName:", pathName);
console.log("H*********************ere is my pathName:*********************");

// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200

// Just on test purposes (not for the task itself):
export function myFunc (x: number): number  {
  return x*x
}

export default app