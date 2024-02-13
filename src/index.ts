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
  // getting the query parameters
  const filename = req.query.filename;
  const imgWidthStr = req.query.width;
  const imgHeightStr = req.query.height;

  let imgWidth = null;
  let imgHeight = null;

  // VALIDATION: width validation
  if (typeof imgWidthStr === "string") {
    imgWidth = parseInt(imgWidthStr, 10);
    if (isNaN(imgWidth) || !/^\d+$/.test(imgWidthStr)) {
      console.log("Invalid width value", imgWidthStr);
      return res
        .status(400)
        .sendFile(path.join(__dirname, "../src/views/errorParam.html"));
    }
  }

  // VALIDATION: height validation
  if (typeof imgHeightStr === "string") {
    imgHeight = parseInt(imgHeightStr, 10);
    if (isNaN(imgHeight) || !/^\d+$/.test(imgHeightStr)) {
      console.log("Invalid height value", imgHeightStr);
      return res
        .status(400)
        .sendFile(path.join(__dirname, "../src/views/errorParam.html"));
    }
  }

  // VALIDATION: validation of filename and check if parameter exist
  if (
    typeof filename !== "string" ||
    !filename ||
    !imgWidth ||
    !imgHeight ||
    imgWidth <= 0 ||
    imgHeight <= 0
  ) {
    return res
      .status(400)
      .sendFile(path.join(__dirname, "../src/views/errorParam.html"));
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
        res
          .status(500)
          .sendFile(path.join(__dirname, "../src/views/error.html"));
      }
    } else {
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

// Just on test purposes (not for the task itself):
export function myFunc(x: number): number {
  return x * x;
}

export default app;

//
// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
