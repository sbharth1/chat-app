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
//  import http from 'http'
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
//  const server = http.createServer(app);
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST',]
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
const PORT = process.env.PORT;
const CONNECT_DB = process.env.CONNECT_DB;
if (!CONNECT_DB) {
    console.log("error connecting in mongodb!!");
}
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(CONNECT_DB)
            .then(() => {
            console.log("Connected MongoDB!!");
        })
            .catch((error) => {
            console.log(error + " error connection to MongoDB!!");
            process.exit(1);
        });
    });
}
;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
app.get("/api/getdata", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query, '---query');
    try {
        yield connectDB();
        let result = yield userSchema_1.default.find();
        console.log(result, '---result');
        res.status(200).json({
            message: "Data fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
})));
app.post("/api/chat", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        yield connectDB();
        const { userName, lastName, email, password, date_of_birth } = req.body;
        if (!userName || !lastName || !email || !password || !date_of_birth) {
            return res.status(400).json({
                message: "Username and last name are required"
            });
        }
        const user = new userSchema_1.default({ userName, lastName, email, password, date_of_birth });
        yield user.save();
        res.status(201).json({
            message: "User created successfully",
            user: { userName, lastName, email, password, date_of_birth }
        });
    }
    catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
})));
app.listen(PORT, () => {
    console.log("http://localhost" + PORT);
});
