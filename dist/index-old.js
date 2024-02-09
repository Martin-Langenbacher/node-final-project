"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const csvtojson_1 = __importDefault(require("csvtojson"));
//const sharp = require("sharp");
const sharp_1 = __importDefault(require("sharp"));
const index_1 = __importDefault(require("./routes/index"));
const pathName_1 = require("./utilities/pathName");
//import { pathName, sendImage } from './pathName';
const app = (0, express_1.default)();
const port = 3000;
const IMAGE_DIR = path_1.default.join(__dirname, "..", "assets", "full");
// FileSystem - example
const inputFile = "./assets/playground/users.csv";
const outputFile = "./assets/playground/users.json";
// Example:
// define a route handler for the default home page
app.get("/convert", (req, res) => {
    res.send("converting in process!");
    (0, csvtojson_1.default)()
        .fromFile(inputFile)
        .then((data) => {
        console.log("AFTER input file");
        return data;
    })
        .then((data) => {
        let newData = data.map((item) => {
            let first = item.first_name;
            let last = item.last_name;
            let phone = item.phone;
            if (item.phone === "") {
                phone = "missing data";
            }
            return { first, last, phone };
        });
        fs_1.promises.writeFile(outputFile, JSON.stringify(newData));
    });
});
app.get("/api/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extracting query parameters
    const filename = req.query.filename;
    const imgWidth = typeof req.query.width === "string" ? parseInt(req.query.width, 10) : null;
    const imgHeight = typeof req.query.height === "string"
        ? parseInt(req.query.height, 10)
        : null;
    //const { filename, width, height } = req.query;
    // Validate input
    if (typeof filename !== "string" || !filename) {
        return res.status(400).send("Filename is required and must be a string");
    }
    // Construct image path
    const imagePath = path_1.default.join(IMAGE_DIR, `${filename}.jpg`);
    try {
        // Use sharp for image processing
        let image = (0, sharp_1.default)(imagePath);
        // Resize image if width and height are provided
        if (imgWidth && imgHeight) {
            image = image.resize(imgWidth, imgHeight);
        }
        // Set the Content-Type header to image/jpeg
        res.type("jpeg");
        // Pipe the processed image to the response
        image.pipe(res);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error processing the image");
    }
}));
// Serve static assets from the assets folder
//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "..", "assets")));
// routes
app.use("/api", index_1.default);
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
    const imagePath = path_1.default.join(__dirname, "..", "assets", "full", imageName);
    (0, pathName_1.sendImageFile)(imagePath, res);
});
console.log("H*********************ere is my pathName:*********************");
console.log("Here is my pathName:", pathName_1.pathName);
console.log("H*********************ere is my pathName:*********************");
// src="/assets/full/palmtunnel.jpg"
//declare function sharp(): Sharp
/*
// Multer config for handling file uploads
const upload = multer({ dest: "uploads/" }); // Temporarily save file to 'uploads/'

// Route to upload and resize image
app.post("/assets/full/", upload.single("picture"), async (req, res) => {
  try {
    const filepath = req.file?.path;

    //.file.path;
    const outputFilename = `resized-${Date.now()}.jpeg`;

    // Use sharp to resize the image
    await sharp(filepath)
      .resize(200, 200) // Resize to 200x200 pixels
      .toFormat("jpeg")
      .jpeg({ quality: 90 }) // Set the quality of the image
      .toFile(`./thumb/${outputFilename}`); // Save the resized image to 'resized/' directory

    res.send(`Image uploaded and resized successfully as ${outputFilename}`);
  } catch (error) {
    console.error("Error processing file", error);
    res.status(500).send("Error processing your file");
  }
  
});

*/
// TODO: Old, delete this !!!
/*
//app.get("*", pathName);
app.get("/image/:imageName", (req, res) => {
  //app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "assets", "full", imageName);
  sendImageFile(imagePath, res);
});
*/
// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
