import crypto from "crypto";

import {
  Event,
  TicketType,
  Registration,
} from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";



// Create Registration

export const createRegistration = async (
  registrationLink,
  data
) => {

  // Find Event

const event = await Event.findOne({
  where: {
    registrationLink,
    isPublished: true,
  },
});


  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  // Registration Deadline

  if (
    event.registrationDeadline &&
    new Date() > event.registrationDeadline
  ) {
    throw new BadRequestError(
      "Registration has closed."
    );
  }

  // Ticket Type

  const ticket = await TicketType.findOne({
    where: {
      id: data.ticketTypeId,
      eventId: event.id,
      isActive: true,
    },
  });

  if (!ticket) {
    throw new NotFoundError("Ticket type not found.");
  }

  // Available Tickets

  if (
    ticket.quantity - ticket.sold <
    data.quantity
  ) {
    throw new BadRequestError(
      "Not enough tickets available."
    );
  }

  // Max Per Attendee

  if (
    data.quantity >
    ticket.maxPerAttendee
  ) {
    throw new BadRequestError(
      `Maximum ${ticket.maxPerAttendee} ticket(s) allowed.`
    );
  }

  // Generate Ticket Number

  const ticketNumber =
    "TKT-" +
    crypto.randomBytes(4).toString("hex").toUpperCase();

  // Create Registration

const quantity = Number(data.quantity) || 1;

// Maximum tickets per attendee
if (quantity > ticket.maxPerAttendee) {
  throw new BadRequestError(
    `Maximum ${ticket.maxPerAttendee} ticket(s) allowed per attendee.`
  );
}

// Remaining tickets
const remainingTickets = ticket.quantity - ticket.sold;

if (quantity > remainingTickets) {
  throw new BadRequestError(
    "Not enough tickets available."
  );
}

const totalAmount =
  Number(ticket.price) * quantity;

const registration = await Registration.create({
  eventId: event.id,

  ticketTypeId: ticket.id,

  firstName: data.firstName,

  lastName: data.lastName,

  email: data.email,

  phone: data.phone,

  quantity,

  totalAmount,

  paymentStatus: event.isPaid
    ? "PENDING"
    : "PAID",

  registrationStatus: event.isPaid
    ? "PENDING"
    : "CONFIRMED",
});

  // Update Sold Count

await ticket.increment("sold", {
  by: quantity,
});

  return {
    registration,
    event,
    ticket,
    requiresPayment: event.isPaid,
  };
};


// get Registration By Id

export const getRegistrationById = async (id) => {
  const registration = await Registration.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
      {
        model: TicketType,
        as: "ticketType",
      },
    ],
  });

  if (!registration) {
    throw new NotFoundError("Registration not found.");
  }

  return registration;
};



// get Event Registrations

export const getEventRegistrations = async (
  eventId,
  organizerId
) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  if (event.organizerId !== organizerId) {
    throw new BadRequestError(
      "You are not authorized to view these registrations."
    );
  }

  return await Registration.findAll({
    where: { eventId },
    order: [["createdAt", "DESC"]],
  });
};


// cancel Registration

export const cancelRegistration = async (
  id,
  organizerId
) => {
  const registration = await Registration.findByPk(id);

  if (!registration) {
    throw new NotFoundError("Registration not found.");
  }

  const event = await Event.findByPk(
    registration.eventId
  );

  if (event.organizerId !== organizerId) {
    throw new BadRequestError(
      "You are not authorized to cancel this registration."
    );
  }

  registration.registrationStatus = "CANCELLED";
  await registration.save();

  return registration;
};