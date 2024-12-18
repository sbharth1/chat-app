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
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
// import { connectDB } from '../config/connect';
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
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
// const server = http.createServer(app);
app.use((0, cors_1.default)({ origin: "http://localhost:4000" }));
app.get("/api/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        res.send("data entered sucessfully!!");
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
}));
app.post("/api/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        yield connectDB();
        const { userName, lastName } = req.body;
        const user = new userSchema_1.default({ userName, lastName });
        yield user.save();
        res.send("hello world");
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
}));
app.listen(PORT, () => {
    console.log("http://localhost" + PORT);
});
