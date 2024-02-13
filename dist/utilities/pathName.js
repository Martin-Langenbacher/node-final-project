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
exports.getImage = exports.sendImageFile = exports.pathName = void 0;
const sharp_1 = __importDefault(require("sharp"));
const pathName = (req, res, next) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const path = req.originalUrl;
    const fullUrl = `${protocol}://${host}${path}`;
    console.log('User requested URL:', fullUrl);
    const filename = req.query.filename;
    const width = typeof req.query.width === 'string' ? parseInt(req.query.width, 10) : null;
    const height = typeof req.query.height === 'string' ? parseInt(req.query.height, 10) : null;
    if (width === null || height === null) {
        console.log('ERROR _______________________________ !!!');
        // Optionally, uncomment the next line if you want to terminate the request here
        // return res.status(400).send("Missing or invalid width or height");
    }
    else {
        console.log('Math:', width + height, ' --> no Error!');
    }
    console.log(`Requested filename: ${filename}, width: ${width}, height: ${height}`);
    console.log('Path-Name:', filename);
    console.log('Path-Name:', filename);
    // Call next middleware or route handler
    next();
};
exports.pathName = pathName;
//export default {pathName, sendIm};
const sendImageFile = (imagePath, res) => {
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Image not found');
        }
    });
};
exports.sendImageFile = sendImageFile;
const getImage = (imagePath, imgWidth, imgHeight, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use sharp for image processing
        let image = (0, sharp_1.default)(imagePath);
        // Resize image if width and height are provided
        if (imgWidth && imgHeight) {
            image = image.resize(imgWidth, imgHeight);
        }
        // Set the Content-Type header to image/jpeg
        res.type('jpeg');
        // Pipe the processed image to the response
        yield image.toBuffer((err, buffer) => {
            if (err) {
                throw err;
            }
            res.end(buffer);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error processing the image (pathName');
    }
});
exports.getImage = getImage;
