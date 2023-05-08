"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControler_1 = require("../controller/userControler");
const router = (0, express_1.Router)();
router.post("/signup", userControler_1.SignUp);
exports.default = router;
