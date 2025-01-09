import { Request, Response } from "express";
import User from "../models/userSchema";
import connectDB from "../config/connect";

export const forgetPassword = async (req: Request, res: Response) => {
    await connectDB();
  console.log(req.body, "reqbodyyyyyyyyyyyyyyyyyyyyyyyyy");
  try {
    const { forgetPasswordEmail } = req.body;
    if (!forgetPasswordEmail) {
      return res.status(400).json({
        message: "invalid and missing email",
      });
    }

    const userEmail = await User.findOne({email:forgetPasswordEmail});
    if(!userEmail){
        res.status(404).json({
          message:"invalid user"
        })
    }


    res.status(200).json({
        message: "Password reset email has been sent. Please check your inbox.",
      });
  } catch (error:any) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred. Please try again later",
      error:error.message
    });
  }
};
