const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
    credentials:true,
    origin:true
}));

app.use(cookieParser());

// app.use("/assets", express.static(path.join(__dirname, "public"))); // Buildin middlewares
app.use(__dirname+ "/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const sampleMiddleware = (req,res,next) => {
    console.log("Middlware");
    next();
   
}

app.use(sampleMiddleware); //Application level middlewares

module.exports = app;

