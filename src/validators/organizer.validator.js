import { body } from "express-validator";

export const createOrganizerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const updateOrganizerValidator = [
  body("firstName").optional().trim(),

  body("lastName").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),
];