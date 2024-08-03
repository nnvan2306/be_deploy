import funcReturn from "../helps/funcReturn.mjs";
import returnErrService from "../helps/returnErrService.mjs";
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmailService = async (email) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USENAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: '"Người Hải Phòng :)) " <vanvanvan23062003@gmail.com>',
            to: email,
            subject: "",
            html: `
            <p>Thank you for trusting and buying our tickets</p>
            <p>Your tickets will be delivered within 1 week</p><br/>
            `, // html body
            attachments: [
                {
                    path: "http://localhost:8080/v1/images/anhdong.gif",
                },
            ],
        });

        return funcReturn("send email ", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = { sendEmailService };
