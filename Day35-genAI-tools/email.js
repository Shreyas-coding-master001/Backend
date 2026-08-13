import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        refreshToken: process.env.OAUTH_REFREASH_TOKEN,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
    }
});

transporter.verify((error, success) => {
    if(error){
        console.log("Error while connecting to email server", error);
    }else{
        console.log("SMTP server is ready to send emails");
    }
});

export async function sendEmail({to, subject, html}){
    const info = transporter.sendMail({
        from: `Myself ${process.env.user}`,
        to : to,
        subject : subject,
        html : html
    });
}