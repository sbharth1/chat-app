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
const express_1 = __importDefault(require("express"));
// import http from 'http'
const cors_1 = __importDefault(require("cors"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
// import { connectDB } from '../config/connect';
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect("mongodb://127.0.0.01/")
            .then(() => {
            console.log("Connected MongoDB!!");
        })
            .catch((error) => {
            console.log(error + " error connecting to MongoDB!!");
        });
    });
}
;
const app = (0, express_1.default)();
// const server = http.createServer(app)
app.use((0, cors_1.default)());
app.get("/api/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const { userName, lastName } = req.body;
    const user = new userSchema_1.default({ userName, lastName });
    yield user.save();
    res.send("hello world");
}));
app.listen(3000);
