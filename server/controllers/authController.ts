import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";
import connectDB from "../config/connect";

export const loginUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password is invalid",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = generateToken(email);
    res.status(200).json({
      message: "Data fetched successfully",
      token,
      data: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { userName, lastName, email, password, dateOfBirth } = req.body;

    if (!userName || !lastName || !email || !password || !dateOfBirth) {
      return res.status(400).json({
        message: "Username and last name are required",
      });
    }

    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName,
      lastName,
      email,
      password: hashPassword,
      dateOfBirth,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: {
        userName:user.userName,
        Email:user.email
      },
    });
  } catch (error: any) {
    res.status(500).send("Server Error: " + error.message);
  }
};
