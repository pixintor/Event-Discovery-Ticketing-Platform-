import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import { User } from "../models/index.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({
      where: {
        email: "admin@example.com",
      },
    });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    await User.create({
      firstName: "System",
      lastName: "Administrator",
      email: "admin@example.com",
      password: "Admin@123",
      role: "ADMIN",
      isActive: true,
    });

    console.log("Admin created successfully.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();