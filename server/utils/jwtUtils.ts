import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const generateToken = (userId:string)=>{
return jwt.sign({userId},process.env.SECRET_KEY!,{expiresIn:'1h'})
}

const verifyToken = (token:string)=>{
return jwt.verify(token,process.env.SECRET_KEY!)
}

export {generateToken,verifyToken};