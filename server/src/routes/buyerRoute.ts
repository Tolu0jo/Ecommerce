import { Router } from "express";
import { SignUp } from "../controller/userControler";

const router = Router()

router.post("/signup",SignUp)

export default router;