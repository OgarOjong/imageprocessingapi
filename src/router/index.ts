import express , {Request, Response, NextFunction }from "express";
import path from "path";
//import {access,constants} from "fs";
import fs from "fs";
import imagefolder from "../assets/full/imagefolder";
import sharp from "sharp";


const routes = express.Router();

routes.get("/", (req:Request,res:Response)=>{
    res.send("REQUEST SENT");
});

interface Query{
    filename:string;
    width:number;
    height: number;
}

//const dirpath = 'C:\Users\EMMANUEL OJONG\Documents\udacity-fullstack-javascript-course\Image-processing-api\src\assets\full';

routes.get("/images", async (req,res)=>{
    res.send("REQUEST SENT");
    /* Parameters we want filename=nameoimage&width=200&height=300  http://localhost:3030/api/images?filename=argentina&width=200&height=300 */ 

    //first- collect filename from req.query, check if file exist and it's an image file, if it is proceed to convert as REQBODY
    // const {filename ,width, height} = req.query as REQBODY;
    //write function to resize imagae and send t0 the front-end 
    const  {filename, width, height} = req.query as unknown as Query;
    console.log(typeof width);

    const checkFileName = async (filename:string)=>{
        try{
        //const filePath = await  path.join(__dirname, filename as string);
            const imgext = ".jpg";
            console.log("just image path",imagefolder());
            let filePath = await  path.join(imagefolder(), filename as string);
            filePath = filePath+imgext;
            // console.log("ext added",filePath+imgext);

            fs.exists(filePath, (isExist)=>{
                if(isExist){
                    console.log("Before resize function ",filePath);
                    resize(filePath);
                //  console.log("it exist",filePath);
                }else{
                    console.log("file does not exist");
                }
            });

            const resize =  (file:string)=>{
                sharp(file).resize(width as number ,height as number).jpeg().toFile(`../assets/thumb${filename}.jpg`);
                // eslint-disable-next-line quotes
                //  sharp(file).resize(200,300).jpeg().toFile(`../assets/thumb/fjor-resize.jpeg`).then().catch(err =>{console.log("thiscall produced and err",err);});


            };
        }

        catch(err){
            console.log(err);
        }
        
    };
    checkFileName(filename as string);

    
    // const filePath = path.join(__dirname, filename as string) ;
    // console.log(filePath);
   

   
});

export default routes;