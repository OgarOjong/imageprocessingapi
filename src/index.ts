import express from "express";

import routes from "./router/index";

const port = 3030;

const app = express();

app.use("/api",routes);

app.get("*", (req,res)=>{
    res.send("KINDLY VISIT A SPECIFIC ENDPOINT");
});
app.listen(port, ()=>{
    console.log(`SERVERR IS LISTENING AT PORT ${port}`);
});