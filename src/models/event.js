import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
    },

    banner: {
      type: DataTypes.STRING,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    registrationLink: {
      type: DataTypes.STRING,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM(
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "UPCOMING",
    },
  },
  {
    tableName: "events",
  }
);

export default Event;