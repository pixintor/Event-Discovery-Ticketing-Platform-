import { Op } from "sequelize";
import { Event, Registration } from "../models/index.js";

export const getOrganizerDashboard = async (organizerId) => {

  const events = await Event.findAll({
    where: {
      organizerId,
    },
    attributes: ["id", "status", "startDate"],
  });
  

  const eventIds = events.map(event => event.id);

  const totalEvents = events.length;

  const publishedEvents = events.filter(
    event => event.status === "UPCOMING"
  ).length;

  const upcomingEvents = events.filter(
    event => new Date(event.startDate) > new Date()
  ).length;

  const totalRegistrations =
    await Registration.count({
      where: {
        eventId: {
          [Op.in]: eventIds,
        },
      },
    });

  const ticketsSold =
    await Registration.count({
      where: {
        eventId: {
          [Op.in]: eventIds,
        },
        paymentStatus: "PAID",
      },
    });

  const paidRegistrations =
    await Registration.findAll({
      where: {
        eventId: {
          [Op.in]: eventIds,
        },
        paymentStatus: "PAID",
      },
      attributes: ["totalAmount"],
    });

  const totalRevenue =
    paidRegistrations.reduce(
      (sum, registration) =>
        sum + Number(registration.totalAmount),
      0
    );

  return {
    totalEvents,
    publishedEvents,
    upcomingEvents,
    totalRegistrations,
    ticketsSold,
    totalRevenue,
  };
};