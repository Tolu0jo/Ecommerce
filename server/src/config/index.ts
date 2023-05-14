import { Sequelize } from "sequelize";
 import dotenv from "dotenv"
 dotenv.config()
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

export const BREVO_USER = process.env.BREVO_USER as string
export const BREVO_PASSWORD = process.env.BREVO_PASSWORD as string
export const BREVO_HOST = process.env.BREVO_HOST as string
export const BREVO_PORT = Number(process.env.BREVO_PORT)
export const FROM_ADMIN_MAIL = process.env.FROM_ADMIN_MAIL as string
export const MAIL_SUBJECT = process.env.MAIL_SUBJECT as string
export const JWT_SECRET = process.env.JWT_SECRET as string

