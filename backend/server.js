import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
const app=express();

app.use(cors())

async function mongoDb (){
    try{
         await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
         console.log("Connected to database");
    }catch(err){
        console.log("Failed to connect with db", err)
    }
}
await mongoDb();

app.listen(8080,()=>{
    console.log("server is listing on port",8080)
})