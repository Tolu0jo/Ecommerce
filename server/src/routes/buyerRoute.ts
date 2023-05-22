import { Router } from "express";
import { SignUp, postForgotPassword, userLogin, verifyUserOtp } from "../controller/userController";

const router = Router()

router.post("/signup",SignUp)
router.post("/verify",verifyUserOtp)
router.post("/forgot-password",postForgotPassword)
router.post("/login",userLogin)

export default router;