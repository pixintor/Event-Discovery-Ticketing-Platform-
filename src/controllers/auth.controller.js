// import { loginUser } from "../services/auth.service.js";
import * as authService from "../services/auth.service.js";


export const register = async (req, res, next) => {
  try {
    const { user, verificationToken } =
      await authService.registerOrganizer(req.body);

    // TODO: Send verification email

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email to complete registration.",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        verificationToken, // Remove this in production after email is implemented
      },
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(
      email,
      password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};