import { Request,Response } from "express"
export const home = async(req:Request,res:Response) =>{
    try{
      res.send("heelo world")
    }catch(err){
        console.log(err + 'err in home.ts')
    }
}