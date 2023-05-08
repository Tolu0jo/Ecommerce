"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_SUBJECT = exports.FROM_ADMIN_MAIL = exports.BREVO_PORT = exports.BREVO_HOST = exports.BREVO_PASSWORD = exports.BREVO_USER = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const db_host = String(process.env.DB_HOST)
// const db_port = Number(process.env.DB_PORT)
// const db_name = String(process.env.DB_NAME)
// const db_User = String(process.env.DB_USER)
// const db_password= String(process.env.DB_PASSWORD)
// export const db = new Sequelize({
//     dialect:"postgres",
//     host: db_host,
//     port: db_port,
//     database: db_name,
//     username: db_User,
//     password: db_password
// });
exports.BREVO_USER = process.env.BREVO_USER;
exports.BREVO_PASSWORD = process.env.BREVO_PASSWORD;
exports.BREVO_HOST = process.env.BREVO_HOST;
exports.BREVO_PORT = Number(process.env.BREVO_PORT);
exports.FROM_ADMIN_MAIL = process.env.FROM_ADMIN_MAIL;
exports.MAIL_SUBJECT = process.env.MAIL_SUBJECT;
