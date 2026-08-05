import { Registration } from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

export const checkInAttendee = async (ticketNumber) => {
  const registration = await Registration.findOne({
    where: {
      ticketNumber,
    },
    include: [
      {
        association: "event",
      },
    ],
  });

  if (!registration) {
    throw new NotFoundError("Invalid ticket.");
  }

  if (registration.paymentStatus !== "PAID") {
    throw new BadRequestError("Ticket has not been paid for.");
  }

  if (registration.registrationStatus !== "CONFIRMED") {
    throw new BadRequestError("Registration not confirmed.");
  }

  if (registration.checkedIn) {
    throw new BadRequestError("Attendee already checked in.");
  }

  registration.checkedIn = true;
  registration.checkedInAt = new Date();

  await registration.save();

  return registration;
};