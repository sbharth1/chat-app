 import express,{Request,Response,NextFunction} from 'express'
 import http from 'http'
 import cors from 'cors'
 import dotenv from 'dotenv'
 import User from '../models/userSchema' 
 import mongoose from 'mongoose'
 import bcrypt from 'bcryptjs'
 import {generateToken} from '../utils/jwtUtils'
 const app = express();
 const server = http.createServer(app);
 
 app.use(cors({
      origin:"http://localhost:5173",
      methods: ['GET', 'POST',]
   }));
 
   app.use(express.json());
   app.use(express.urlencoded({extended:true}));



 dotenv.config();
 const PORT = process.env.PORT;
 const CONNECT_DB  = process.env.CONNECT_DB;

 if(!CONNECT_DB ){
   console.log("error connecting in mongodb!!")
 }

 async function connectDB(){
    mongoose.connect(CONNECT_DB!)
    .then(()=>{
        console.log("Connected MongoDB!!")
    })
    .catch((error)=>{
       console.log(error+ " error connection to MongoDB!!");
       process.exit(1);
    })

 };



const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
   return (req: Request, res: 
      Response, next: NextFunction) => {
     Promise.resolve(fn(req, res, next)).catch(next);
   };
 };
 
  
    app.post("/api/login", asyncHandler( async (req:Request,res:Response)=>{
      try {

        await connectDB();
        const {email,password} = req.body;
        if(!email || !password){
          return res.status(400).json({ 
            message: "email and password is invalid", 
          });
        }
        let result = await User.findOne({email});
        const token = generateToken(email);
           res.status(200).json({
         message: "Data fetched successfully",
         token,
         data: result,
       })
       } catch (error:any) {
         res.status(500).json({
            message: "Server Error",
            error: error.message,
         })
       }
    }));


 app.post("/api/signup", asyncHandler(async (req: Request,res: Response) => {
    console.log(req.body);
    try {
        await connectDB();
       const { userName, lastName,email,password,dateOfBirth} = req.body;
       console.log(req.body);
     if (!userName || !lastName || !email || !password || !dateOfBirth) {
       return res.status(400).json({ 
         message: "Username and last name are required" 
      });
     }
   
     const salt = await bcrypt.genSalt(15);
     const hashPassword = await bcrypt.hash(password,salt);
    

     const user = new User({ userName, lastName,email,password:hashPassword,dateOfBirth});

     await user.save();

     res.status(201).json({ 
       message: "User created successfully", 
       user: { userName, lastName,email,dateOfBirth, }
          });
     } catch (error:any) {
       res.status(500).send("Server Error: " + error.message);
     }
 }));

 
 server.listen(PORT,()=>{
    console.log("http://localhost"+PORT);
 });


