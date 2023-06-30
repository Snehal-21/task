import fs from "fs";
import path from "path";

const __dirname=path.resolve();
var products_data;
export const Products=async(req,res)=>{
    try{
         products_data = JSON.parse(fs.readFileSync(__dirname+`/products.json`)); 
        // console.log(products_data);
        return res.send(products_data);
    }catch(error){
        return res.send(error);
    }
}

console.log(products_data,"data here")


