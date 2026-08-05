import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Prevents self-signed certificate errors
      },
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    return "Database Connected Successfully";
  } catch (error) {
    return "Database connection error:", error;
    process.exit(1);
  }
};

export default sequelize;
