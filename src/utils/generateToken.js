import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Generate JWT Access Token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

/**
 * Generate Random Token
 * Used for:
 * - Email Verification
 * - Password Reset
 */
export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash Token
 * Store hashed tokens in the database
 */
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};