import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
// import fs from "fs";
import router from "./routes/userroutes.js";

const app=express();

const __dirname=path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/task',router);

// app.get("/products",(req,res)=>{
//     try{
//         const products_data = JSON.parse(fs.readFileSync(__dirname+`/products.json`)); 
//         console.log(products_data);
//         return res.send(products_data);
//     }catch(error){
//         return res.send(error);
//     }
// })



app.listen((8000),()=>console.log("working"));