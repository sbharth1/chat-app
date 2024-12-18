import express,{Request,Response} from 'express'
// import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import User from '../models/userSchema' 
// import { connectDB } from '../config/connect';
import mongoose from 'mongoose'
const app = express();

dotenv.config();
const PORT = process.env.PORT;

async function connectDB(){
   mongoose.connect("mongodb://127.0.0.01/")
   .then(()=>{
      console.log("Connected MongoDB!!")
   })
   .catch((error)=>{
      console.log(error+ " error connecting to MongoDB!!");
   })

};

// const server = http.createServer(app);

app.use(cors(
   {origin:"http://localhost:4000"},
   ));




   app.get("/api/chat",async (req:Request,res:Response)=>{
      console.log(req.body);
      try {
         res.send("data entered sucessfully!!")
       } catch (error:any) {
         res.status(500).send("Server Error: " + error.message);
       }
   })

app.post("/api/chat",async (req:Request,res:Response)=>{
   console.log(req.body);
   try {
       await connectDB();
      const { userName, lastName } = req.body;
      const user = new User({ userName,lastName });
       await user.save();
      res.send("hello world");
    } catch (error:any) {
      res.status(500).send("Server Error: " + error.message);
    }
})

app.listen(PORT,()=>{
   console.log("http://localhost"+PORT);
});