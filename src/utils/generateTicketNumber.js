import { Registration, Event, TicketType } from "../models/index.js";

export const generateTicketNumber = async (
  eventId,
  ticketTypeId
) => {
  const event = await Event.findByPk(eventId);

  const ticketType = await TicketType.findByPk(ticketTypeId);

  const count = await Registration.count({
    where: {
      eventId,
      paymentStatus: "PAID",
    },
  });

  const year = new Date(event.startDate).getFullYear();

  const sequence = String(count + 1).padStart(6, "0");

  return `${event.eventCode}-${year}-${ticketType.code}-${sequence}`;
};