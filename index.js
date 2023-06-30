import express from "express"
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use("/api/task", router);

mongoose.connect(process.env.MONGODB)
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Error ==>", err));

app.listen(process.env.PORT, ()=> console.log("Working on port "));