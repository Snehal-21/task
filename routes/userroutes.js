import express from "express";
import { Products } from "../controllers/usercontroller.js";
const router=express();

router.get('/Products',Products);
export default router;