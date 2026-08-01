import Joi from "joi";

/**
 * Organizer Registration Validation
 */
export const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),

  lastName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),

  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
  }),

  phone: Joi.string().trim().min(10).max(15).required().messages({
    "string.empty": "Phone number is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter and one number",
    }),
});

/**
 * Login Validation
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

/**
 * Forgot Password Validation
 */
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

/**
 * Reset Password Validation
 */
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),

  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
    )
    .required(),
});

/**
 * Change Password Validation
 */
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
    )
    .required(),
});