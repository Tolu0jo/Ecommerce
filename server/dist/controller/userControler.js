"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserOtp = exports.SignUp = void 0;
const utility_1 = require("../utils/utility");
const utility_2 = require("../utils/utility");
const notification_1 = require("../utils/notification");
const userModel_1 = __importDefault(require("../model/userModel"));
const uuid_1 = require("uuid");
//======================REGISTER USER ==========================//
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, password, confirm_password } = req.body;
        const id = (0, uuid_1.v4)();
        const validateResult = utility_1.registerSchema.validate(req.body, utility_2.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const salt = yield (0, utility_1.GenerateSalt)();
        const userPassword = yield (0, utility_1.HashedPassword)(password, salt);
        const { otp, expiry } = (0, notification_1.GenerateOtp)();
        const User = yield userModel_1.default.findOne({ where: { email } });
        if (!User) {
            const newUser = yield userModel_1.default.create({
                id,
                firstName,
                lastName,
                email,
                phone,
                password: userPassword,
                salt,
                otp,
                otp_expiry: expiry,
                lat: 0,
                lng: 0,
                role: "buyer",
                verified: false,
                address: "",
            });
            //====send otp in mail===\\
            // const html = emailHtml(otp, salt);
            // await sendEmail(FROM_ADMIN_MAIL, email, MAIL_SUBJECT, html);
            return res.status(201).json({
                message: "User Registered Successfully",
                newUser,
            });
        }
        return res.status(400).json({
            Error: "Email Already Exists",
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "user/signup",
        });
    }
});
exports.SignUp = SignUp;
//========================= VERIFY OTP=========================//
const verifyUserOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield userModel_1.default.findOne({
            where: { email }
        });
        if (user) {
            if (user.otp === parseInt(otp) && user.otp_expiry >= new Date()) {
                const updateUser = (yield userModel_1.default.update({
                    verified: true
                }, { where: { email: email } }));
                if (updateUser) {
                    const user = yield userModel_1.default.findOne({ where: { email } });
                    return res.status(200).json({
                        message: "User Verified Successfully",
                        verified: user.verified
                    });
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            Route: "user/verify"
        });
    }
});
exports.verifyUserOtp = verifyUserOtp;
