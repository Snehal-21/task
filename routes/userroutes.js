import express from "express";
import { Products, countProduct } from "../controllers/productController.js";
const router=express();

router.get('/Products',Products);
router.get('/countProduct',countProduct)
export default router;