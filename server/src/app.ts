import express from 'express'
// import http from 'http'
import cors from 'cors'
import User from '../models/userSchema' 
// import { connectDB } from '../config/connect';
import mongoose from 'mongoose'

async function connectDB(){
   mongoose.connect("mongodb://127.0.0.01/")
   .then(()=>{
      console.log("Connected MongoDB!!")
   })
   .catch((error)=>{
      console.log(error+ " error connecting to MongoDB!!");
   })

};



const app = express();
// const server = http.createServer(app)

app.use(cors())

app.get("/api/chat",async (req,res)=>{
    await connectDB();
     const {userName,lastName} = req.body;
     const user = new User({userName,lastName});
     await user.save();
    res.send("hello world");
})

app.listen(3000)    