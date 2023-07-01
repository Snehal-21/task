import express from "express";
import { Products, app, appcount, countProduct, pagination } from "../controllers/productController.js";
const router=express();

router.get('/Products',Products);
router.get('/countProduct',countProduct);
router.get('/pagination',pagination);
router.get('/app',app);
router.get('/appcount',appcount);
export default router;