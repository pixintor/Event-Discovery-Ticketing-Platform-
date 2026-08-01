import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,

    port: Number(process.env.EMAIL_PORT),

    secure: process.env.EMAIL_PORT == 465,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

    },

});

export const verifyMailConnection = async () => {

    try {

        await transporter.verify();

        console.log("✅ Mail Server Connected");

    } catch (error) {

        console.error("❌ Mail Connection Failed");

        console.error(error.message);

    }

};

export default transporter;