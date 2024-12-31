"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const asyncHandle_1 = __importDefault(require("../helpers/asyncHandle"));
const dashboard_1 = require("../controllers/dashboard");
const authToken_1 = require("../utils/authToken");
const router = (0, express_1.Router)();
// public rotues
router.post('/login', (0, asyncHandle_1.default)(authController_1.loginUser));
router.post('/signup', (0, asyncHandle_1.default)(authController_1.signupUser));
// private rotues
router.get('/dashboard', authToken_1.authenticateJWT, (0, asyncHandle_1.default)(dashboard_1.home));
exports.default = router;
