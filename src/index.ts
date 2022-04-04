import express from "express";
import dotenv from "dotenv";
import routes from "./router/index";
dotenv.config();
const port = process.env.PORT;

const app = express();

app.use("/api",routes);

app.get("*", (req,res)=>{
    res.send("KINDLY VISIT A SPECIFIC ENDPOINT");
});
app.listen(port, ()=>{
    console.log(`SERVERR IS LISTENING AT PORT ${port}`);
});