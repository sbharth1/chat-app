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
exports.signupUser = exports.loginUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
const connect_1 = __importDefault(require("../config/connect"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password is invalid",
            });
        }
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        const token = (0, jwtUtils_1.generateToken)(email);
        res.status(200).json({
            message: "Data fetched successfully",
            token,
            data: {
                userName: user.userName,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const { userName, lastName, email, password, dateOfBirth } = req.body;
        if (!userName || !lastName || !email || !password || !dateOfBirth) {
            return res.status(400).json({
                message: "Username and last name are required",
            });
        }
        const user = new userSchema_1.default({
            userName,
            lastName,
            email,
            password,
            dateOfBirth,
            passwordResetToken: "",
            passwordResetExpires: ""
        });
        yield user.save();
        res.status(201).json({
            message: "User created successfully",
            data: {
                userName: user.userName,
                Email: user.email
            },
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
exports.signupUser = signupUser;
