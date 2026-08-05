import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.EMAIL_PORT) || 587;
const isSecure = port === 465;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: port,
  secure: isSecure,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    return "Mail server connection verified successfully";
  } catch (error) {
    return `Mail Connection Failed: ${error.message}`;
  }
}

export default transporter;