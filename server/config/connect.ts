import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const CONNECT_DB = process.env.CONNECT_DB!;

if(!CONNECT_DB){
   console.error("MonogDB_URL is not defined in env file!!");
}

export async function connectDB(){
   mongoose.connect(CONNECT_DB)
   .then(()=>{
      console.log("Connected MongoDB!!")
   })
   .catch((error)=>{
      console.log(error + " error connecting to MongoDB!!");
   })

};