import { TicketType, Event } from "../models/index.js";
import { Op } from "sequelize";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import ForbiddenError from "../errors/ForbiddenError.js";


/*
Create Ticket
*/ 

export const createTicket = async (organizerId, data) => {
  // Check that the event exists
  const event = await Event.findByPk(data.eventId);

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  // Ensure the organizer owns the event
  if (event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only create tickets for your own events."
    );
  }

  // Prevent duplicate ticket names for the same event
  const existingTicket = await TicketType.findOne({
    where: {
      eventId: data.eventId,
      name: data.name,
    },
  });

  if (existingTicket) {
    throw new BadRequestError(
      "A ticket with this name already exists for this event."
    );
  }

  // Free event validation
  if (!event.isPaid && Number(data.price) > 0) {
    throw new BadRequestError(
      "Free events cannot have paid tickets."
    );
  }

  // Paid event validation
  if (event.isPaid && Number(data.price) <= 0) {
    throw new BadRequestError(
      "Paid events must have a ticket price greater than zero."
    );
  }

  // Generate ticket code automatically
  const code = data.name
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");

  const ticket = await TicketType.create({
    ...data,
    code,
  });

  return ticket;
};


// Get All Tickets

export const getAllTickets = async () => {
  return await TicketType.findAll({
    include: [
      {
        model: Event,
        as: "event",
        attributes: ["id", "title"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Get Ticket By ID

export const getTicketById = async (id) => {
  const ticket = await TicketType.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
  });

  if (!ticket) {
    throw new NotFoundError("Ticket not found.");
  }

  return ticket;
};


// Get Tickets By Event

export const getTicketsByEvent = async (eventId) => {
  return await TicketType.findAll({
    where: {
      eventId,
      isActive: true,
    },
    order: [["price", "ASC"]],
  });
};


// Update Ticket

export const updateTicket = async (
  id,
  organizerId,
  data
) => {
  const ticket = await TicketType.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
  });

  if (!ticket) {
    throw new NotFoundError("Ticket not found.");
  }

  if (ticket.event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only update your own tickets."
    );
  }

  await ticket.update(data);

  return ticket;
};


// Delete Ticket

export const deleteTicket = async (
  id,
  organizerId
) => {
  const ticket = await TicketType.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
  });

  if (!ticket) {
    throw new NotFoundError("Ticket not found.");
  }

  if (ticket.event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only delete your own tickets."
    );
  }

  await ticket.destroy();

  return true;
};

// Activate Ticket

export const activateTicket = async (
  id,
  organizerId
) => {
  const ticket = await TicketType.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
  });

  if (!ticket) {
    throw new NotFoundError("Ticket not found.");
  }

  if (ticket.event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only activate your own tickets."
    );
  }

  await ticket.update({
    isActive: true,
  });

  return ticket;
};


// Deactivate Ticket

export const deactivateTicket = async (
  id,
  organizerId
) => {
  const ticket = await TicketType.findByPk(id, {
    include: [
      {
        model: Event,
        as: "event",
      },
    ],
  });

  if (!ticket) {
    throw new NotFoundError("Ticket not found.");
  }

  if (ticket.event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only deactivate your own tickets."
    );
  }

  await ticket.update({
    isActive: false,
  });

  return ticket;
};