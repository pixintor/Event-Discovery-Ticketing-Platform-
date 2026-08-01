import crypto from "crypto";
import { User } from "../models/index.js";
import {
  generateRandomToken,
  generateAccessToken,
} from "../utils/generateToken.js";
import { sendVerificationEmail } from "./email.service.js";

import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { hashToken } from "../utils/generateToken.js";

/**
 * ===============================
 * Register Organizer
 * ===============================
 */
export const registerOrganizer = async (data) => {
  const existingUser = await User.findOne({
    where: {
      email: data.email.toLowerCase().trim(),
    },
  });

  if (existingUser) {
    throw new ConflictError(
      "An account with this email already exists."
    );
  }

  // Generate raw token
  const verificationToken = generateRandomToken();

  // Store hashed token
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

const requireVerification =
  process.env.REQUIRE_EMAIL_VERIFICATION === "true";

const user = await User.create({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone,
  password: data.password,
  role: "ORGANIZER",

  emailVerificationToken: requireVerification
    ? hashedToken
    : null,

  emailVerified: !requireVerification,

  isActive: !requireVerification,
});
console.log("📧 Sending verification email to:", user.email);


if (requireVerification) {
  try {
    await sendVerificationEmail({
      email: user.email,
      firstName: user.firstName,
      token: verificationToken,
    });

  } catch (error) {
    console.error("Verification email failed:", error.message);
        console.error(error);
  }
}

  return {
    user,
  };
};

/**
 * ===============================
 * Login User
 * ===============================
 */
export const loginUser = async (email, password) => {

const user = await User.scope("withPassword").findOne({
  where: {
    email: email.toLowerCase().trim(),
  },
});
  if (!user) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  if (!user.emailVerified) {
    throw new UnauthorizedError(
      "Please verify your email before logging in."
    );
  }

  if (!user.isActive) {
    throw new UnauthorizedError(
      "Your account has not been activated."
    );
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateAccessToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};



// Email Verification

export const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    where: {
      emailVerificationToken: hashedToken,
    },
  });

  if (!user) {
    throw new NotFoundError(
      "Invalid or expired verification link."
    );
  }

  user.emailVerified = true;
  user.isActive = true;
  user.emailVerificationToken = null;

  await user.save();

  return user;
};
