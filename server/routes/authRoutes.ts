import { Router } from "express";
import { loginUser,signupUser } from "../controllers/authController";
import  asyncHandler  from "../helpers/asyncHandle";
const router  = Router();

router.post('/login',asyncHandler(loginUser));
router.post('/signup', asyncHandler(signupUser));


export default router;