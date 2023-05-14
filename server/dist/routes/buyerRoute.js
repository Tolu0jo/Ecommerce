"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post("/signup", userController_1.SignUp);
router.post("/verify", userController_1.verifyUserOtp);
router.post("/forgot-password", userController_1.postForgotPassword);
exports.default = router;
