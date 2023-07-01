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
                    return res.send({"Total products are":productFilter.length,"products":productFilter});
                }else{
                    const price=parseInt(range);
                    const productRange=await Product.find({}).exec();
                    let productFilter=productRange.filter(items=>items.price >=price);
                    return res.send({"Total products are":productFilter.length,"products":productFilter});
                    
                }
            }
            if(category && range){
                if(range.includes("-")){
                    const[price1,price2]=range.split("-").map(Number);
                    const productRange=await Product.find({category}).exec();
                    let productFilter=productRange.filter(items => items.price>=price1 && items.price<=price2);
                    return res.send({"Total products are":productFilter.length,"products":productFilter});
                }else{
                    const price=parseInt(range);
                    const productRange=await Product.find({category}).exec();
                    let productFilter=productRange.filter(items=>items.price >=price);
                    return res.send({"Total products are":productFilter.length,"products":productFilter});
                    
                }
            }
        } catch (error) {
            return res.send(error);
        }
    }


    export const pagination=async(req,res)=>{
        try {
            const {limit,offset}=req.query;
            const defaultlimit=5;
            const defaultoffset=0;
            if(!limit && ! offset){
                const product=await Product.find({}).skip(defaultoffset).limit(defaultlimit).exec();
                if(!product.length) return res.send("Products not found.");
                let ObjectProduct = {};
                for(let i=0;i<product.length;i++){
                    ObjectProduct[i] = product[i]._id;
                }
                return res.send({"Total products are":product.length,"Object ID's of Products" : ObjectProduct,"products":product});
            }

            if(!limit && offset){
                const newOffset = offset * defaultlimit;
                const product=await Product.find({}).skip(newOffset).limit(defaultlimit).exec();
                if(!product.length) return res.send("Products not found.");
                let ObjectProduct = {};
                for(let i=0;i<product.length;i++){
                    ObjectProduct[i] = product[i]._id;
                }
                return res.send({"Total products are":product.length,"Object ID's of Products" : ObjectProduct,"products":product});
            }

            if(limit && !offset){
                const newOffset = offset * limit;
                const product=await Product.find({}).skip(newOffset).limit(limit).exec();
                if(!product.length) return res.send("Products not found.");
                let ObjectProduct = {};
                for(let i=0;i<product.length;i++){
                    ObjectProduct[i] = product[i]._id;
                }
                return res.send({"Total products are":product.length,"Object ID's of Products" : ObjectProduct,"products":product});
            }

            if(limit && offset){
                const newOffset = offset * limit;
                const product=await Product.find({}).skip(newOffset).limit(limit).exec();
                if(!product.length) return res.send("Products not found.");
                let ObjectProduct = {};
                for(let i=0;i<product.length;i++){
                    ObjectProduct[i] = product[i]._id;
                }
                return res.send({"Total products are":product.length,"Object ID's of Products" : ObjectProduct,"products":product});
            }
        } catch (error) {
            return res.send(error);
        }
    }


export const app= async(req, res)=> {
        try {
            // console.log(req.query, "req.query")
            const limit = (req.query.limit < 5 ? req.query.limit : 5 );
            const offset = req.query.offset || 0;
            // console.log(limit, offset,"limit, offset")
            // var ids = [];
    
            //Write your Code here.
            const resFromDB = await Product.find().skip(limit * offset).limit(limit).select('_id');
            
            const ids = resFromDB.map(pro => pro._id)
    
            res.send(ids);
    
        } catch (error) {
            return res.send(error)
        }
    }




    export const appcount =async (req, res)=>
    
    
    {

        const { category, range } = req.query;
        try {
            let query = {};
            // console.log(range)
            if (category) {
                query.category = category
            }
            if (range) {
    
                const [minPrice, maxPrice] = range.split('-');
                // console.log(minPrice, maxPrice,"chec here")
                if (minPrice && maxPrice) {
                    query.price = { $gte: minPrice, $lte: maxPrice }
                } else if (minPrice) {
                    query.price = { $gte: minPrice }
                }
            }
            // console.log(query, "query")
            // console.log(minPrice,maxPrice,"range")
            const resFromMongo = await Product.find(query).exec();
            res.json(resFromMongo.length);
        } catch (error) {
            return res.send(error);
        }
    }
