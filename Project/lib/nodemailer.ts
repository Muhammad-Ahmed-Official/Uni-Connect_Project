import { configs } from '@/configs/configs';
import { SEND_EMAIL_LINK, Verification_Email_Template } from '@/email/Email_Template';
import nodemailer from 'nodemailer';

const emailConfig = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: configs.portalEmail,
        pass: configs.portalPassword,
    },
};

async function sendEmailOTP(mail: string, otp: string) {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: configs.portalEmail,
        to: mail,
        subject: "OTP Verification",
        html: Verification_Email_Template(otp),
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: `OTP sent to ${mail} via email`,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error sending OTP to ${mail} via email: ${error}`,
        };
    }
}



async function sendEmailLink(mail: string, link: string, subject: string) {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: configs.portalEmail,
        to: mail,
        subject,
        html: SEND_EMAIL_LINK(link, subject), // html body 
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: "send"
        };
    } catch (error) {
        // throw `Error sending OTP to ${mail} via email: ${error}`;
        return {
            success: false,
            message: `Error sending Link to ${mail} via email: ${error}`,
        }
    }
}


export { sendEmailOTP, sendEmailLink }