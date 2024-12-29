import { Router } from "express";
import { loginUser,signupUser } from "../controllers/authController";
import  asyncHandler  from "../helpers/asyncHandle";
import { home } from "../controllers/home";
const router  = Router();

// public rotues
router.post('/login',asyncHandler(loginUser));
router.post('/signup', asyncHandler(signupUser));

// private rotues
router.get('/dashboard', asyncHandler(home));

export default router;