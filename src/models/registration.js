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

    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    ticketTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
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

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    paymentReference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    paymentStatus: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },

    registrationStatus: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },

    ticketNumber: {
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
    timestamps: true,
  }
);

export default Registration;