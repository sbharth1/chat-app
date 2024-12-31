  import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken'
  import dotenv from 'dotenv'
  dotenv.config();

  const SECRET_KEY = process.env.SECRET_KEY!;

  const generateToken = (userId:string)=>{
  return jwt.sign({userId},SECRET_KEY,{expiresIn:'1h'})
  }

  const verifyToken = (req:Request,res:Request,next:NextFunction)=>{
    try{
      const token = req.headers['authorization']?.split(' ')[1];
      if(!token){
        return res.status(403).json({"message":"No Token Provided"})
      }
      const decoded = jwt.verify(token,SECRET_KEY);
      req.userId = decoded.id;
      next()
    }catch(err){
    return res.statusCode(500).json({"message":"server error"})
    }
  }



    

  export {generateToken,verifyToken};