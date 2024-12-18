 import express,{Request,Response,NextFunction} from 'express'
//  import http from 'http'
 import cors from 'cors'
 import dotenv from 'dotenv'
 import User from '../models/userSchema' 
 import mongoose from 'mongoose'
 const app = express();
//  const server = http.createServer(app);
 
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
 
   
    app.get("/api/chat",async (req:Request,res:Response)=>{
      console.log(req.body);
      try {
        let result =  await User.find();
         res.send("data entered sucessfully!!  ---" + result);
       } catch (error:any) {
         res.status(500).send("Server Error: " + error.message);
       }
    })



 app.post("/api/chat", asyncHandler(async (req: Request,res: Response) => {
    console.log(req.body);
    try {
        await connectDB();
       const { userName, lastName,email,password,date_of_birth } = req.body;
     if (!userName || !lastName || !email || !password || !date_of_birth) {
       return res.status(400).json({ 
         message: "Username and last name are required" 
      });
     }
     const user = new User({ userName, lastName,email,password,date_of_birth });
     await user.save();

     res.status(201).json({ 
       message: "User created successfully", 
       user: { userName, lastName,email,password,date_of_birth } 
          });
     } catch (error:any) {
       res.status(500).send("Server Error: " + error.message);
     }
 }));

 app.listen(PORT,()=>{
    console.log("http://localhost"+PORT);
 });


