import express , {Request, Response, NextFunction }from "express";
import path from "path";
//import {access,constants} from "fs";
import fs from "fs";
import imagefolder from "../assets/full/imagefolder";
import getDirT from "../assets/thumb/thumbimagefold";
import sharp from "sharp";
import NodeCache from "node-cache";

const myCache = new NodeCache({stdTTL:20});


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
                    ///console.log("Before resize function ",filePath);
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
                const imgpath = getDirT() +  `${filename}.jpg`;

                if(myCache.has("cImage")){
                    //check for cached calls and return cached calls 
                    console.log("Getting it from cache");
                    const cachedFile = myCache.get("cImage");
                    console.log("cached data",cachedFile);
                    return res.sendFile(String(cachedFile));
                    //return  res.sendFile(cachedFile);
                }else{
                    //return uncached calls 
                    sharp(filePath).resize(a,b).toFile(imgpath)
                        .then((data) =>{
                            console.log(data);
                            console.log(imgpath);
                            
                            myCache.set("cImage", imgpath);
                            console.log("Getting it from new process");
                            res.sendFile(imgpath);
                        
                        })
                        .catch(err => err);

                }

               
            
                //   return resizedImg;

            };
            
        }

        catch(err){
            console.log(err);
        }
        // res.send("Processing Data ... ");
        
    };
    checkFileName(filename as string);
});

routes.get("/stats",(req:Request, res:Response)=>{
    res.send(myCache.getStats());
});

export default routes;