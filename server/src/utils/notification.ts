import nodemailer from 'nodemailer'
import { BREVO_HOST, BREVO_PASSWORD, BREVO_PORT, BREVO_USER, FROM_ADMIN_MAIL, MAIL_SUBJECT} from '../config';


export const GenerateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiry = new Date();
  const dar = expiry.setTime(new Date().getTime() + 5 * 60 * 1000);
  return { otp, expiry };
};
//email function//sendinblue
let transport = nodemailer.createTransport({
    host:BREVO_HOST,
    port:BREVO_PORT,
    auth: {
        user: BREVO_USER,
        pass: BREVO_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const sendEmail = async(
    from:string,
    to:string,
    subject:string,
    html:string
)=>{
    try {
     const response = await transport.sendMail({
        from:FROM_ADMIN_MAIL,
        to,
        subject: MAIL_SUBJECT,
        html
     })
     return response
    } catch (error) {
        console.log(error)
    }
}

export const emailHtml =(otp:number)=>{
    const temp = 
    `
    <div style="max-width:700px; font-size:110%; border:10px solid red;
    padding:50px 20px; margin:auto; text-align:center; ">
    <h2 style = "text-transform:uppercase; text-align:center; color:red;">
    Welcome to Ecommerce
    </h2>
    <p> Hi there, your otp is ${otp}, expires in 5min</p>
    </div>
   
    `
    return temp
}

export const emailForgotPassword=(otp:number)=>{
    const temp = 
    `
    <div style="max-width:700px; font-size:110%; border:10px solid red;
    padding:50px 20px; margin:auto; text-align:center; ">
    <p> Hi there, your otp is ${otp}, expires in 5min</p>
    </div>
   
    `
    return temp
}