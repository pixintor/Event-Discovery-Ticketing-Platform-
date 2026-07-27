import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ticketId: {
      type: DataTypes.STRING,
      unique: true,
    },

    qrCode: {
      type: DataTypes.TEXT,
    },

    checkedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    checkedInAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "registrations",
  }
);

export default Registration;