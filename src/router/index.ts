import express , {Request, Response, NextFunction }from "express";
import path from "path";
//import {access,constants} from "fs";
import fs from "fs";
import imagefolder from "../assets/full/imagefolder";
import getDirT from "../assets/thumb/thumbimagefold";
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


routes.get("/images", async (req,res)=>{
    
    
    const  {filename, width, height} = req.query as unknown as Query;
    // console.log(typeof width);

    const checkFileName = async (filename:string)=>{
        try{
        //const filePath = await  path.join(__dirname, filename as string);
            const imgext = ".jpg";
            //  console.log("just image path",imagefolder());
            let filePath = await  path.join(imagefolder(), filename as string);
            filePath = filePath+imgext;
            console.log("ext added",filePath+imgext);

            fs.exists(filePath, (isExist)=>{
                if(isExist){
                    console.log("Before resize function ",filePath);
                    resize(width,height);
                    return filePath;
                    
                //  console.log("it exist",filePath);
                }else{
                    console.log("file does not exist");
                }
            });

            const resize = async (a:number, b:number)=>{
                a= Number(width);
                b=Number(height);

                const resizedImg =  sharp(filePath).resize(a,b).toFile(getDirT() +`${filename}.jpg`)
                    .then(data => data)
                    .catch(err => err);
                console.log(await resizedImg);
                return resizedImg;

            };
            console.log("resize printing out",resize(width,height));
            res.status(200).json({
                message:"file processed",
                status: true,
                data: {
                    imgurl:`localhost:${process.env.PORT}/assets/thumb/${filename}.jpg`
                }
            });
        }

        catch(err){
            console.log(err);
        }
        res.send("Processing Data ... ");
        
    };
    


    checkFileName(filename as string);
   
});

export default routes;