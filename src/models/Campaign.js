import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Campaign = sequelize.define(
    "Campaign",
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

      organizerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          "DRAFT",
          "SENT"
        ),
        defaultValue: "DRAFT",
      },

      sentAt: {
        type: DataTypes.DATE,
      },

      recipients: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      emailSent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
},
    },
    {
      tableName: "campaigns",
      timestamps: true,
    }
  );

  return Campaign;
};