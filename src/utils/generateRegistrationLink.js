import crypto from "crypto";

export const generateRegistrationLink = () => {
  return crypto.randomBytes(16).toString("hex");
};