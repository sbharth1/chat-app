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
exports.forgetPassword = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const connect_1 = __importDefault(require("../config/connect"));
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)();
    console.log(req.body, "reqbodyyyyyyyyyyyyyyyyyyyyyyyyy");
    try {
        const { forgetPasswordEmail } = req.body;
        if (!forgetPasswordEmail) {
            return res.status(400).json({
                message: "invalid and missing email",
            });
        }
        const userEmail = yield userSchema_1.default.findOne({ email: forgetPasswordEmail });
        if (!userEmail) {
            res.status(404).json({
                message: "invalid user"
            });
        }
        res.status(200).json({
            message: "Password reset email has been sent. Please check your inbox.",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred. Please try again later",
            error: error.message
        });
    }
});
exports.forgetPassword = forgetPassword;
