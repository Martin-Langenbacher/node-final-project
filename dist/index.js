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
exports.myFunc = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const savePicture_1 = require("./utilities/savePicture");
const doesFileExist_1 = __importDefault(require("./utilities/doesFileExist"));
// TODO: Open: Functions do not have typed parameters or return type. !!!!!!!!!!!
const app = (0, express_1.default)();
const port = 3000;
const FULL_IMAGE_DIR = path_1.default.join(__dirname, '..', 'assets', 'full');
const THUMB_IMAGE_DIR = path_1.default.join(__dirname, '..', 'assets', 'thumb');
app.get('/api/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting the query parameters
    const filename = req.query.filename;
    const imgWidthStr = req.query.width;
    const imgHeightStr = req.query.height;
    let imgWidth = null;
    let imgHeight = null;
    // VALIDATION: width validation
    if (typeof imgWidthStr === 'string') {
        imgWidth = parseInt(imgWidthStr, 10);
        if (isNaN(imgWidth) || !/^\d+$/.test(imgWidthStr)) {
            return res.status(400).sendFile(path_1.default.join(__dirname, '../src/views/errorParam.html'));
        }
    }
    // VALIDATION: height validation
    if (typeof imgHeightStr === 'string') {
        imgHeight = parseInt(imgHeightStr, 10);
        if (isNaN(imgHeight) || !/^\d+$/.test(imgHeightStr)) {
            return res.status(400).sendFile(path_1.default.join(__dirname, '../src/views/errorParam.html'));
        }
    }
    // VALIDATION: validation of filename and check if parameter exist
    if (typeof filename !== 'string' ||
        !filename ||
        !imgWidth ||
        !imgHeight ||
        imgWidth <= 0 ||
        imgHeight <= 0) {
        return res.status(400).sendFile(path_1.default.join(__dirname, '../src/views/errorParam.html'));
    }
    // Construct image path
    const fullImagePath = path_1.default.join(FULL_IMAGE_DIR, `${filename}.jpg`);
    const thumbImagePath = path_1.default.join(THUMB_IMAGE_DIR, `${filename}-${imgWidth}x${imgHeight}.jpg`);
    const outputFilename = `${filename}-${imgWidth}x${imgHeight}.jpg`;
    const fileExistInThumb = yield (0, doesFileExist_1.default)(outputFilename, THUMB_IMAGE_DIR);
    const fileExistOriginal = yield (0, doesFileExist_1.default)(`${filename}.jpg`, FULL_IMAGE_DIR);
    if (fileExistInThumb) {
        return res.status(200).sendFile(thumbImagePath);
    }
    else {
        if (fileExistOriginal) {
            try {
                const outputPath = yield (0, savePicture_1.saveResizedImage)(fullImagePath, imgWidth, imgHeight, outputFilename);
                res.sendFile(outputPath);
            }
            catch (error) {
                res.status(500).sendFile(path_1.default.join(__dirname, '../src/views/error.html'));
            }
        }
        else {
            res.status(500).sendFile(path_1.default.join(__dirname, '../src/views/error.html'));
        }
    }
}));
//app.use('/assets', express.static('../assets/full/'));
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, '..', 'assets', 'full')));
// start the Express server:
app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
});
// routes
app.use('/api', index_1.default);
//app.use("/continents", routes);
//app.use("/countries", routes);
// Just on test purposes (not for the task itself):
function myFunc(x) {
    return x * x;
}
exports.myFunc = myFunc;
exports.default = app;
//
// Example URL:
// http://localhost:3000/api/images?filename=fjord&width=200&height=200
//
/*
Note:
TODO: Converting code for csv: Not needed in this project!

app.get('/convert', (req, res) => {
  res.send('converting in process!');
  csv()
    .fromFile(inputFile)
    .then((data) => {
      console.log('AFTER input file');
      return data;
    })
    .then((data) => {
      const newData = data.map((item: { first_name: string; last_name: string; phone: string }) => {
        const first = item.first_name;
        const last = item.last_name;
        let phone = item.phone;
        if (item.phone === '') {
          phone = 'missing data';
        }
        return { first, last, phone };
      });
      fsPromises.writeFile(outputFile, JSON.stringify(newData));
    });
});


*/
