import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../config/mail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, "../templates");

/**
 * Read HTML template
 */
const loadTemplate = async (filename) => {
  return await fs.readFile(
    path.join(templatesDir, filename),
    "utf8"
  );
};

/**
 * Send Email
 */
export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

/**
 * Send Verification Email
 */
export const sendVerificationEmail = async ({
  email,
  firstName,
  token,
}) => {
  const template = await loadTemplate(
    "verificationEmail.html"
  );

  const verificationLink =
    `${process.env.APP_URL}/api/v1/auth/verify-email/${token}`;

  const html = template
    .replace("{{firstName}}", firstName)
    .replace("{{verificationLink}}", verificationLink);

  await sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    html,
  });
};

/**
 * Send Password Reset Email
 */
export const sendResetPasswordEmail = async ({
  email,
  firstName,
  token,
}) => {
  const template = await loadTemplate(
    "resetPassword.html"
  );

  const resetLink =
    `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const html = template
    .replace("{{firstName}}", firstName)
    .replace("{{resetLink}}", resetLink);

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html,
  });
};