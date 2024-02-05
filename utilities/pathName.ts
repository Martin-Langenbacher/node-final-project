import { Request, Response } from "express";

const pathName = (req: Request, res: Response, next: Function) => {
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
  }

  // Respond to the client
  res.send(`You requested URL --> from pathName.js: ${fullUrl}`);

  console.log(
    `Requested filename: ${filename}, width: ${width}, height: ${height}`
  );

  console.log("Path-Name:", filename);
  // Call next middleware or route handler
  next();
  return 'Hello'
};

export default pathName;
