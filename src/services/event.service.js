import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { Event, Category } from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";

import { generateRegistrationLink } from "../utils/generateRegistrationLink.js";

import { generateEventCode } from "../utils/generateEventCode.js";



export const createEvent = async (
  organizerId,
  data
) => {
  const category = await Category.findByPk(
    data.categoryId
  );

  if (!category || !category.isActive) {
    throw new NotFoundError(
      "Category not found."
    );
  }

  const event = await Event.create({
    organizerId,

    categoryId: data.categoryId,

    title: data.title,

    eventCode: generateEventCode(data.title),

    slug: `${slugify(data.title, {
      lower: true,
      strict: true,
    })}-${uuidv4().slice(0,8)}`,

    description: data.description,

    venue: data.venue,

    address: data.address,

    state: data.state,

    banner: data.banner,

    startDate: data.startDate,

    endDate: data.endDate,

    registrationDeadline:
      data.registrationDeadline,

    capacity: data.capacity,

    isPaid: data.isPaid,

    registrationLink:
      generateRegistrationLink(),

    status: "DRAFT",

    isPublished: false,
  });

  return event;
};







// Get All Events

export const getAllEvents = async () => {
  return await Event.findAll({
    where: {
      isPublished: true,
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
      {
        model: User,
        as: "organizer",
        attributes: [
          "id",
          "firstName",
          "lastName",
        ],
      },
    ],
    order: [["startDate", "ASC"]],
  });
};



// Get event by ID

export const getEventById = async (id) => {
  const event = await Event.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
      },
      {
        model: User,
        as: "organizer",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
        ],
      },
    ],
  });

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  return event;
};


// Get My Events
export const getMyEvents = async (organizerId) => {
  return await Event.findAll({
    where: {
      organizerId,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};


// Update Event

export const updateEvent = async (
  id,
  organizerId,
  data
) => {
  const event = await Event.findOne({
    where: {
      id,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

  await event.update(data);

  return event;
};


// Delete Event

export const deleteEvent = async (
  id,
  organizerId
) => {
  const event = await Event.findOne({
    where: {
      id,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

  await event.destroy();

  return true;
};


// Publish Event


export const publishEvent = async (
  id,
  organizerId
) => {
  const event = await Event.findOne({
    where: {
      id,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

  await event.update({
    isPublished: true,
    status: "UPCOMING",
  });

  return event;
};



// Unpublish Event

export const unpublishEvent = async (
  id,
  organizerId
) => {
  const event = await Event.findOne({
    where: {
      id,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

  await event.update({
    isPublished: false,
    status: "DRAFT",
  });

  return event;
};