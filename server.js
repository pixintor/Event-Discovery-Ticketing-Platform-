import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { sequelize } from "./src/models/index.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Synchronize Sequelize models
    await sequelize.sync({
      alter: true, // Development only
    });

    console.log(" Database synchronized.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();