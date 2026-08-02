import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TicketType = sequelize.define(
  "TicketType",
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    salesStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    salesEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    maxPerAttendee: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "ticket_types",
    timestamps: true,
  }
);

export default TicketType;