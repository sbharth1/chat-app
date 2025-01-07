import { Request,Response } from "express";

export const forgetPassword = async(req:Request,res:Response)=>{
 
    const {forgetPasswordEmail} = req.body;
    if(!forgetPasswordEmail){
        res.status(400).json({
            "message":"invalide forgetPasswordEmail",
        })
    }
    res.send(forgetPassword);

}