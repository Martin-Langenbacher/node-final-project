import { Request, Response } from "express";
import sharp from "sharp";

export const pathName = (req: Request, res: Response, next: Function) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const path = req.originalUrl;
  const fullUrl = `${protocol}://${host}${path}`;

  console.log("User requested URL:", fullUrl);

  const filename = req.query.filename;
  const width =
    typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;
  const height =
    typeof req.query.height === "string"
      ? parseInt(req.query.height, 10)
      : null;

  if (width === null || height === null) {
    console.log("ERROR _______________________________ !!!");
    // Optionally, uncomment the next line if you want to terminate the request here
    // return res.status(400).send("Missing or invalid width or height");
  } else {
    console.log("Math:", width + height, " --> no Error!");
  }

  // Respond to the client
  //res.send(`You requested URL --> from pathName.js: ${fullUrl}`);

  /*
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send("Image not found");
    }
  });
  */

  console.log(
    `Requested filename: ${filename}, width: ${width}, height: ${height}`
  );

  console.log("Path-Name:", filename);
  console.log("Path-Name:", filename);
  // Call next middleware or route handler
  next();
};

//export default {pathName, sendIm};
export const sendImageFile = (imagePath: string, res: Response) => {
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send("Image not found");
    }
  });
};

export const getImage = async (
  imagePath: string,
  imgWidth: number,
  imgHeight: number,
  res: Response
) => {
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
    await image.toBuffer((err, buffer) => {
      if (err) {
        throw err;
      }
      res.end(buffer);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image (pathName");
  }
};
