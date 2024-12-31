import { Router } from "express";
import { loginUser,signupUser } from "../controllers/authController";
import  asyncHandler  from "../helpers/asyncHandle";
import { home } from "../controllers/dashboard";
import { authenticateJWT } from "../utils/authToken";
const router  = Router();

// public rotues
router.post('/login',asyncHandler(loginUser));
router.post('/signup', asyncHandler(signupUser));

// private rotues
router.get('/dashboard',authenticateJWT,asyncHandler(home));

export default router;