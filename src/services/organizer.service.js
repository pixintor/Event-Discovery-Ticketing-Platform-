import { User } from "../models/index.js";
import { ROLES } from "../constants/roles.js";

export const createOrganizer = async (data) => {
  const existingUser = await User.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const organizer = await User.create({
    ...data,
    role: ROLES.ORGANIZER,
  });

  return organizer;
};

export const getAllOrganizers = async () => {
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

export const getOrganizerById = async (id) => {
  const organizer = await User.findOne({
    where: {
      id,
      role: "ORGANIZER",
    },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!organizer) {
    throw new Error("Organizer not found");
  }

  return organizer;
};

export const updateOrganizer = async (id, data) => {
  const organizer = await User.findOne({
    where: {
      id,
      role: "ORGANIZER",
    },
  });

  if (!organizer) {
    throw new Error("Organizer not found");
  }

  await organizer.update(data);

  return organizer;
};

export const changeOrganizerStatus = async (id) => {
  const organizer = await User.findOne({
    where: {
      id,
      role: "ORGANIZER",
    },
  });

  if (!organizer) {
    throw new Error("Organizer not found");
  }

  organizer.isActive = !organizer.isActive;

  await organizer.save();

  return organizer;
};