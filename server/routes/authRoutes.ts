import { Router } from "express";
import { loginUser,signupUser } from "../controllers/authController";
import  asyncHandler  from "../helpers/asyncHandle";
import { home } from "../controllers/dashboard";
import { verifyToken } from "../utils/jwtUtils";
const router  = Router();

// public rotues
router.post('/login',asyncHandler(loginUser));
router.post('/signup', asyncHandler(signupUser));

// private rotues
router.get('/dashboard',verifyToken,asyncHandler(home));

export default router;