import { NextFunction,Response,Request } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

const generateToken = (userId:string)=>{
return jwt.sign({userId},process.env.SECRET_KEY!,{expiresIn:'1h'})
}

const verifyToken = (token:string)=>{
return jwt.verify(token,process.env.SECRET_KEY!)
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.sendStatus(403); 
    }
    
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403); 
      }
      req.user = user;
      next();
    });
  };
  

export {generateToken,verifyToken,authenticateJWT};