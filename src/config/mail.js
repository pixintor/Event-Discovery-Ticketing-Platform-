import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    return "✅ Mail server is ready.";
  } catch (error) {
    return `❌ Mail Connection Failed\nError Details: ${error.message}`;
  }
};


export default transporter;