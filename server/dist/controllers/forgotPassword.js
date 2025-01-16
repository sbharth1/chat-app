"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const connect_1 = __importDefault(require("../config/connect"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'hey-nigga!!';
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
    try {
        const { forgotPassword } = req.body;
        console.log(forgotPassword);
        if (!forgotPassword) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = yield userSchema_1.default.findOne({ email: forgotPassword });
        if (!user) {
            return res.status(200).json({
                message: "Invalid user"
            });
        }
        const resetToken = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email,
            type: 'password-reset'
        }, JWT_SECRET, { expiresIn: '1h' });
        const tokenSignature = resetToken.split('.')[2];
        user.passwordResetToken = tokenSignature;
        user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
        yield user.save();
        const resetUrl = `http://localhost:5173/api/reset-password/${resetToken}`;
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            message: "An error occurred. Please try again later."
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (error) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }
        if (decodedToken.type !== 'password-reset') {
            return res.status(400).json({
                message: "Invalid token type"
            });
        }
        const user = yield userSchema_1.default.findOne({
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
        yield user.save();
        const authToken = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: "Password successfully reset",
            token: authToken
        });
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            message: "An error occurred. Please try again later."
        });
    }
});
exports.resetPassword = resetPassword;
