import crypto from "crypto";

export const generateRegistrationLink = () => {
  const token = crypto.randomBytes(16).toString("hex");

  return `${process.env.APP_URL}/register/${token}`;
};