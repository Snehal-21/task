import express from "express";
import { Products, countProduct, pagination } from "../controllers/productController.js";
const router=express();

router.get('/Products',Products);
router.get('/countProduct',countProduct);
router.get('/pagination',pagination);
export default router;