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


export const getAllTickets = async () => {};
export const getTicketById = async () => {};
export const getTicketsByEvent = async () => {};
export const updateTicket = async () => {};
export const deleteTicket = async () => {};
export const activateTicket = async () => {};
export const deactivateTicket = async () => {};