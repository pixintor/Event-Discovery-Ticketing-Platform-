import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import { ROLES } from "../constants/roles.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required",
        },
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
        notEmpty: {
          msg: "Email is required",
        },
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.ORGANIZER,
    },

   adminLevel: {
  type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN"),
  defaultValue: "ADMIN",
},
    paystackSubaccountCode: {
  type: DataTypes.STRING,
  allowNull: true,
},

paystackRecipientCode: {
  type: DataTypes.STRING,
  allowNull: true,
},

bankName: {
type: DataTypes.STRING,
allowNull: true,
},

accountNumber: {
type: DataTypes.STRING,
allowNull: true,
},

accountName: {
type: DataTypes.STRING,
allowNull: true,
},

bankCode: {
type: DataTypes.STRING,
allowNull: true,
},

paymentSetupCompleted: {
type: DataTypes.BOOLEAN,
defaultValue: false,
},
    
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",

    timestamps: true,

    defaultScope: {
      withPassword:{
      attributes: {
        exclude: [
          "password",
          "emailVerificationToken",
          "passwordResetToken",
          "passwordResetExpires",
        ],
      },
    },
  },

    scopes: {
      withPassword: {
        attributes: {},
      },
    },

    hooks: {
      async beforeCreate(user) {
        if (user.email) {
          user.email = user.email.toLowerCase().trim();
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },

      async beforeUpdate(user) {
        if (user.changed("email")) {
          user.email = user.email.toLowerCase().trim();
        }

        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

/**
 * Compare password
 */
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Return safe user object
 */
User.prototype.toJSON = function () {
  const values = { ...this.get() };

  delete values.password;
  delete values.emailVerificationToken;
  delete values.passwordResetToken;
  delete values.passwordResetExpires;

  return values;
};

export default User;