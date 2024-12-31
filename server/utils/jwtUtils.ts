import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

const generateToken = (userId:string)=>{
return jwt.sign({userId},SECRET_KEY,{expiresIn:'1h'})
}

const verifyToken = (token:string)=>{
return jwt.verify(token,SECRET_KEY)
}



  

export {generateToken,verifyToken};