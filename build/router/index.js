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
//import {access,constants} from "fs";
const fs_1 = __importDefault(require("fs"));
const imagefolder_1 = __importDefault(require("../assets/full/imagefolder"));
const sharp_1 = __importDefault(require("sharp"));
const routes = express_1.default.Router();
routes.get("/", (req, res) => {
    res.send("REQUEST SENT");
});
//const dirpath = 'C:\Users\EMMANUEL OJONG\Documents\udacity-fullstack-javascript-course\Image-processing-api\src\assets\full';
routes.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("REQUEST SENT");
    /* Parameters we want filename=nameoimage&width=200&height=300  http://localhost:3030/api/images?filename=argentina&width=200&height=300 */
    //first- collect filename from req.query, check if file exist and it's an image file, if it is proceed to convert as REQBODY
    // const {filename ,width, height} = req.query as REQBODY;
    //write function to resize imagae and send t0 the front-end 
    const { filename, width, height } = req.query;
    console.log(typeof width);
    const checkFileName = (filename) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //const filePath = await  path.join(__dirname, filename as string);
            const imgext = ".jpg";
            //  console.log("just image path",imagefolder());
            let filePath = yield path_1.default.join((0, imagefolder_1.default)(), filename);
            filePath = filePath + imgext;
            // console.log("ext added",filePath+imgext);
            fs_1.default.exists(filePath, (isExist) => {
                if (isExist) {
                    console.log("Before resize function ", filePath);
                    resize(filePath);
                    //  console.log("it exist",filePath);
                }
                else {
                    console.log("file does not exist");
                }
            });
            const resize = (file) => {
                (0, sharp_1.default)(file).resize(Number(width), Number(height)).jpeg().toFile(`../assets/thumb${filename}.jpg`);
                // eslint-disable-next-line quotes
                //  sharp(file).resize(200,300).jpeg().toFile(`../assets/thumb/fjor-resize.jpeg`).then().catch(err =>{console.log("thiscall produced and err",err);});
            };
        }
        catch (err) {
            console.log(err);
        }
    });
    checkFileName(filename);
    // const filePath = path.join(__dirname, filename as string) ;
    // console.log(filePath);
}));
exports.default = routes;
