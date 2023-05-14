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
exports.emailForgotPassword = exports.emailHtml = exports.sendEmail = exports.GenerateOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const GenerateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    const dar = expiry.setTime(new Date().getTime() + 5 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
//email function//sendinblue
let transport = nodemailer_1.default.createTransport({
    host: config_1.BREVO_HOST,
    port: config_1.BREVO_PORT,
    auth: {
        user: config_1.BREVO_USER,
        pass: config_1.BREVO_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendEmail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield transport.sendMail({
            from: config_1.FROM_ADMIN_MAIL,
            to,
            subject: config_1.MAIL_SUBJECT,
            html
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
const emailHtml = (otp) => {
    const temp = `
    <div style="max-width:700px; font-size:110%; border:10px solid red;
    padding:50px 20px; margin:auto; text-align:center; ">
    <h2 style = "text-transform:uppercase; text-align:center; color:red;">
    Welcome to Ecommerce
    </h2>
    <p> Hi there, your otp is ${otp}, expires in 5min</p>
    </div>
   
    `;
    return temp;
};
exports.emailHtml = emailHtml;
const emailForgotPassword = (otp) => {
    const temp = `
    <div style="max-width:700px; font-size:110%; border:10px solid red;
    padding:50px 20px; margin:auto; text-align:center; ">
    <p> Hi there, your otp is ${otp}, expires in 5min</p>
    </div>
   
    `;
    return temp;
};
exports.emailForgotPassword = emailForgotPassword;
