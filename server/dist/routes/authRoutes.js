"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const asyncHandle_1 = __importDefault(require("../helpers/asyncHandle"));
const router = (0, express_1.Router)();
router.post('/login', (0, asyncHandle_1.default)(authController_1.loginUser));
router.post('/signup', (0, asyncHandle_1.default)(authController_1.signupUser));
exports.default = router;
