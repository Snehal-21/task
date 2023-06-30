import fs from "fs";
import path from "path";
import Product from "../models/products.js";

const __dirname = path.resolve();
var products_data;
export const Products = async (req, res) => {
    try {
        products_data = JSON.parse(fs.readFileSync(__dirname + `/products.json`));
        for (var i = 0; i < products_data.length; i++) {

            let p_id = products_data[i]["p_id"];
            let name = products_data[i]["name"];
            let price = products_data[i]["price"];
            let Quantity = products_data[i]["Quantity"];
            let instock = products_data[i]["instock"];
            let description = products_data[i]["description"];
            let category = products_data[i]["category"];

            var newproduct = {
                "p_id":p_id,
                "name": name,
                "description": description,
                "price": price,
                "category": category,
                "Quantity":Quantity,
                "instock":instock
            };

            Product.create(newproduct);
        }
        return res.send("Products added successfully.");  
        }catch (error) {
            return res.send(error);
        }
    }


    export const countProduct=async(req,res)=>{
        try {
            const {category,range}=req.query;

            let countproducts=await Product.countDocuments();

            if(!category && !range){
                return res.send("count of all products are:"+countproducts);
            }

            if(category && !range){
                const productCategory=await Product.find({category}).exec();
                return res.send({"Total products are":productCategory.length,"products":productCategory});
            }
            if(!category && range){
                if(range.includes("-")){
                    const[price1,price2]=range.split("-").map(Number);
                    const productRange=await Product.find({}).exec();
                    let productFilter=productRange.filter(items => items.price>=price1 && items.price<=price2);
                    return res.send({"Total products are":productFilter.length,"products":productFilter})
                }
            }
        } catch (error) {
            return res.send(error);
        }
    }


