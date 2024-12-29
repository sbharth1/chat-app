"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST',],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', authRoutes_1.default);
exports.default = app;
