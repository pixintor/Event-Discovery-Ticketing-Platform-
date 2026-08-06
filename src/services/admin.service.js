import { Op } from "sequelize";
import bcrypt from "bcryptjs";

import { User, Event, Registration,} from "../models/index.js";
import { calculatePlatformCommission } from "../utils/commission.js";
import ConflictError from "../errors/ConflictError.js";

// /////Dashboard

export const dashboard = async () => {
  const totalOrganizers = await User.count({
    where: {
      role: "ORGANIZER",
    },
  });

  const activeOrganizers = await User.count({
    where: {
      role: "ORGANIZER",
      isActive: true,
    },
  });

  const totalEvents = await Event.count();

  const publishedEvents = await Event.count({
    where: {
      status: "UPCOMING",
    },
  });

  const draftEvents = await Event.count({
    where: {
      status: "DRAFT",
    },
  });

  const totalRegistrations =
    await Registration.count();

  const ticketsSold =
    await Registration.count({
      where: {
        paymentStatus: "PAID",
      },
    });

  const totalRevenue =
    Number(
      await Registration.sum("totalAmount", {
        where: {
          paymentStatus: "PAID",
        },
      })
    ) || 0;

  const platformCommission =
    totalRevenue * 0.05;

  return {
    totalOrganizers,
    activeOrganizers,
    totalEvents,
    publishedEvents,
    draftEvents,
    totalRegistrations,
    ticketsSold,
    totalRevenue,
    platformCommission,
  };
};


// /////Get Organizers
export const getOrganizers = async () => {
  return await User.findAll({
    where: {
      role: "ORGANIZER",
    },
    attributes: {
      exclude: ["password"],
    },
    order: [["createdAt", "DESC"]],
  });
};

// ////Suspend / Activate Organizer

export const toggleOrganizerStatus = async (
  id
) => {
  const organizer =
    await User.findByPk(id);

  if (!organizer) {
    throw new NotFoundError(
      "Organizer not found."
    );
  }

  organizer.isActive =
    !organizer.isActive;

  await organizer.save();

  return organizer;
};

// ////Get Events
export const getEvents = async () => {
  return await Event.findAll({
    include: [
      {
        association: "organizer",
        attributes: [
          "firstName",
          "lastName",
          "email",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// ////Get Registrations
export const getRegistrations =
  async () => {
    return await Registration.findAll({
      include: [
        {
          association: "event",
          attributes: ["title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  };

  // /////Analytics

  export const analytics =
  async () => {
    const paid =
      await Registration.sum(
        "totalAmount",
        {
          where: {
            paymentStatus: "PAID",
          },
        }
      );

    const pending =
      await Registration.count({
        where: {
          paymentStatus: "PENDING",
        },
      });

    const failed =
      await Registration.count({
        where: {
          paymentStatus: "FAILED",
        },
      });

    return {
      totalRevenue: paid || 0,
      pendingPayments: pending,
      failedPayments: failed,
    };
  };


  //////Get Transaction

  export const getTransactions =
  async () => {

    const registrations =
      await Registration.findAll({
        where: {
          paymentStatus: "PAID",
        },

        include: [
          {
            association: "event",

            attributes: ["title"],

            include: [
              {
                association: "organizer",

                attributes: [
                  "firstName",
                  "lastName",
                ],
              },
            ],
          },
        ],

        order: [
          ["updatedAt", "DESC"],
        ],
      });

    return registrations.map(
      (registration) => {

        const commission =
  calculatePlatformCommission(
    registration.totalAmount
  );

        return {

          reference:
            registration.paymentReference,

          event:
            registration.event.title,

          organizer:
            `${registration.event.organizer.firstName} ${registration.event.organizer.lastName}`,

          attendee:
            `${registration.firstName} ${registration.lastName}`,

          email:
            registration.email,

          amount:
            registration.totalAmount,

          platformCommission:
            commission,

          organizerReceives:
            registration.totalAmount -
            commission,

          paymentStatus:
            registration.paymentStatus,

          paidAt:
            registration.updatedAt,
        };
      }
    );
  };


  ///////revenue Report

  export const revenueReport = async () => {

  const paidRegistrations =
    await Registration.findAll({
      where: {
        paymentStatus: "PAID",
      },
    });

  let grossRevenue = 0;
  let platformRevenue = 0;
  let organizerRevenue = 0;

  paidRegistrations.forEach((registration) => {

    const amount =
      Number(registration.totalAmount);

    const commission =
      calculatePlatformCommission(amount);

    grossRevenue += amount;

    platformRevenue += commission;

    organizerRevenue +=
      amount - commission;
  });

  return {
    totalTransactions:
      paidRegistrations.length,

    grossRevenue,

    platformRevenue,

    organizerRevenue,
  };
};

// ///  Create Admin
export const createAdmin = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  adminLevel = "STANDARD",
}) => {

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role: "ADMIN",
    adminLevel,
    emailVerified: true,
    isActive: true,
  });

  const { password: _, ...data } = admin.toJSON();

  return data;
};