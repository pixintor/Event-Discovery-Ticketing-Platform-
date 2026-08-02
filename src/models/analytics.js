import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Analytics = sequelize.define(
  "Analytics",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    uniqueVisitors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    registrations: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    revenue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    conversionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
  },
  {
    tableName: "analytics",
    timestamps: true,
  },
);

export default Analytics;
