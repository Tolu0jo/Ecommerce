import { Request, Response } from "express";
import { GenerateSalt, HashedPassword, registerSchema } from "../utils/utility";
import { option } from "../utils/utility";
import { GenerateOtp,emailHtml,sendEmail } from "../utils/notification";
import UserModel from "../model/userModel";
import {v4 as uuidv4} from 'uuid'
import { FROM_ADMIN_MAIL, MAIL_SUBJECT } from "../config";



export const SignUp = async(req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, confirm_password } =
      req.body;
  const id = uuidv4()
    const validateResult = registerSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const salt = await GenerateSalt()
     const userPassword = await HashedPassword(password,salt )

     const{otp,expiry}=GenerateOtp()

   const User = await UserModel.findOne({where:{email}})
     if(!User){
        const newUser = await UserModel.create({
            id,
            firstName,
            lastName,
            email,
            phone,
            password:userPassword,
            salt,
            otp,
            otp_expiry:expiry,
            lat:0,
            lng:0,
            role:"buyer",
            verified:false,
            address:""
        })

        //send otp in mail
        const html = emailHtml(otp,salt);
        await sendEmail(FROM_ADMIN_MAIL,email,MAIL_SUBJECT,html)


        return res.status(201).json({
            message: "User Registered Successfully",
            newUser
        })
     }
     return res.status(400).json({
      Error:"Email Already Exists"
     })
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "users/signup",
    });
  }
};
