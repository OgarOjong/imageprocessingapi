"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const port = 3030;
const app = (0, express_1.default)();
app.use("/api", index_1.default);
app.get("*", (req, res) => {
    res.send("KINDLY VISIT A SPECIFIC ENDPOINT");
});
app.listen(port, () => {
    console.log(`SERVERR IS LISTENING AT PORT ${port}`);
});
