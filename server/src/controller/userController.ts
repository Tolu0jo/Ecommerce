import { Request, Response } from "express";
import {
  GenerateSalt,
  HashedPassword,
  registerSchema,
  GenerateSignature,
  validatePassword,
} from "../utils/utility";
import { option } from "../utils/utility";
import {
  GenerateOtp,
  emailForgotPassword,
  emailHtml,
  sendEmail,
} from "../utils/notification";
import UserModel, { UserAttributes } from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import { FROM_ADMIN_MAIL, MAIL_SUBJECT } from "../config";
import { verifySignature } from "../utils/utility";

//======================REGISTER USER ==========================//
export const SignUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, confirm_password } =
      req.body;
    const id = uuidv4();
    const validateResult = registerSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const salt = await GenerateSalt();
    const userPassword = await HashedPassword(password, salt);

    const { otp, expiry } = GenerateOtp();

    const User = await UserModel.findOne({ where: { email } });
    if (!User) {
      const newUser = await UserModel.create({
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
      // const html = emailHtml(otp);
     const signature = GenerateSignature(email)
      // await sendEmail(FROM_ADMIN_MAIL, email, MAIL_SUBJECT, html);
      
      return res.status(201).json({
        message: "User Registered Successfully",
        success: true,
        newUser,
        signature
      });
    }
    return res.status(400).json({
      Error: "Email Already Exists",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "user/signup",
    });
  }
};

//========================= VERIFY OTP=========================//

export const verifyUserOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
   
    if (!email || !otp) {
      return res.status(400).json({
        Error: "Email or Otp is empty",
      });
    }

    const user = (await UserModel.findOne({
      where: { email },
    })) as unknown as UserAttributes;

    if (user ) {
      if (user.dataValues.otp === parseInt(otp) && user.dataValues.otp_expiry >= new Date()) {
        const updateUser = (await UserModel.update(
          {
            verified: true,
          },
          { where: { email: email } }
        )) as unknown as UserAttributes;
      
        if (updateUser) {
          return res.status(200).json({
            message: "User Verified Successfully",
            verified: user.verified,
            
          });
        }
      }
    }
    return res.status(400).json({
      Error: "Invalid Otp",
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      Route: "user/verify",
    });
  }
};

//===================================FORGOT PASSWORD=====================================//

export const postForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({
        Error: "Email is required",
      });
    }
    const user = await UserModel.findOne({ where: { email: email } });

    if (!user)
      return res.status(401).json({
        Error: "User not registered",
      });
    const { otp, expiry } = GenerateOtp();
    if (user) {
      const updateUser = (await UserModel.update(
        {
          otp,
          otp_expiry: expiry
        },
        { where: { email: email } }
      )) as unknown as UserAttributes;
      const signature =await GenerateSignature({
        email
      })
      if (updateUser) {
        const html = emailForgotPassword(otp);

        //await sendEmail(FROM_ADMIN_MAIL, email, MAIL_SUBJECT, html);
        res.status(200).json({
        message: "Reset Password Otp sent successfully",
        success: true,
        otp,
        expiry,
        signature
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Internal server error",
      Route: "user/forgot-Password",
    });
  }
};

//============================ LOGIN ===========================//
export const userLogin =async (req:Request, res:Response) => {
try {
  const {email,password}=req.body;
  //joi validation
  const user = await UserModel.findOne({where:{email}}) as unknown as UserAttributes
 
  if(user.verified) {
  const validated = await validatePassword(password,user.password,user.salt)
if(validated){
  const signature =await GenerateSignature({
   
    email
  })
 return res.status(200).json({ 
  message: "User successfully login",
 signature,
 role:user.role
})
}
  }else{
    return res.status(401).json({
      Error : "User not verified"
    })
  }
  return res.status(404).json({
    Error : "User does not exist"
  })
} catch (error) {
  console.log(error)
  res.status(500).json({Error:"Internal Server Error"})
}
}

//=====================RESET/CHANGE-PASSWORDS =============================//
export const postResetPassword = async(req: Request, res: Response)=>{
  try { 
    const{token}= req.params
    const verified = verifySignature(token)
 

    
    
  } catch (error) {
    console.log(error)
  res.status(500).json({Error:"Internal Server Error"})
  }
}