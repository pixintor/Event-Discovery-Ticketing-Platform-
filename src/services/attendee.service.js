import {
  Event,
  Registration,
} from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";

export const getEventAttendees = async (
  eventId,
  organizerId
) => {

  const event = await Event.findOne({
    where: {
      id: eventId,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

const attendees = await Registration.findAll({
  where: {
    eventId,
  },
  attributes: [
    "id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "ticketNumber",
    "paymentStatus",
    "registrationStatus",
    "checkedIn",
    "checkedInAt",
    "createdAt",
  ],
  include: [
    {
      association: "event",
      attributes: ["title"],
    },
  ],
  order: [["createdAt", "DESC"]],
});

  return attendees;
};