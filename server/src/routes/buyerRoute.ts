import { Router } from "express";
import { SignUp, postForgotPassword, verifyUserOtp } from "../controller/userController";

const router = Router()

router.post("/signup",SignUp)
router.post("/verify",verifyUserOtp)
router.post("/forgot-password",postForgotPassword)

export default router;