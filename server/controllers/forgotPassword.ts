import { Request, Response } from "express";
import User from "../models/userSchema";
import connectDB from "../config/connect";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'hey-nigga!!';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const {email} = req.body;
    console.log(forgotPassword)
    if (!forgotPassword) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ 
        message: "Invalid user",
         });
    }
    const resetToken = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        type: 'password-reset'
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const tokenSignature = resetToken.split('.')[2];
    user.passwordResetToken = tokenSignature;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/api/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });

    res.status(200).json({ 
      message: "If a user with this email exists, they will receive password reset instructions." 
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      message: "An error occurred. Please try again later." 
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
        type: string;
      };
    } catch (error) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token" 
      });
    }

    if (decodedToken.type !== 'password-reset') {
      return res.status(400).json({ 
        message: "Invalid token type" 
      });
    }

    const user = await User.findOne({
      _id: decodedToken.userId,
      email: decodedToken.email,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token" 
      });
    }

    const tokenSignature = token.split('.')[2];
    if (user.passwordResetToken !== tokenSignature) {
      return res.status(400).json({ 
        message: "Invalid reset token" 
      });
    }

    user.password = newPassword; 
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const authToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: "Password successfully reset",
      token: authToken
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      message: "An error occurred. Please try again later." 
    });
  }
};







