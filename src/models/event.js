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

    organizerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    eventCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
      allowNull: false,
    },

    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bannerPublicId: {
  type: DataTypes.STRING,
  allowNull: true,
},

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    registrationDeadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    registrationLink: {
      type: DataTypes.STRING,
      unique: true,
    },

    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    status: {
      type: DataTypes.ENUM(
        "DRAFT",
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "DRAFT",
    },
  },
  {
    tableName: "events",
    timestamps: true,
  }
);

export default Event;