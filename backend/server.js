import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
const app=express();
import authRoutes from "./routes/businessLogin.js";
import customerRoutes from "./routes/customer.js";
import dashboardRoutes from "./routes/dashboard.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json());

async function mongoDb (){
    try{
         await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
         console.log("Connected to database");
    }catch(err){
        console.log("Failed to connect with db", err)
    }
}
await mongoDb();

app.use("/api/billKhata",authRoutes);
app.use("/api/billkhata",dashboardRoutes);
app.use("/api/billkhata",customerRoutes);


app.listen(8080,()=>{
    console.log("server is listing on port",8080)
})