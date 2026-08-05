import PDFDocument from "pdfkit";
import { Parser } from "json2csv";

import {
  Event,
  Registration,
} from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";

export const downloadCSV = async (eventId) => {
  const event = await Event.findByPk(eventId, {
    include: [
      {
        association: "registrations",
      },
    ],
  });

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  const attendees = event.registrations.map((r) => ({
    Event: event.title,
    FirstName: r.firstName,
    LastName: r.lastName,
    Email: r.email,
    Phone: r.phone,
    Ticket: r.ticketNumber,
    Payment: r.paymentStatus,
    Status: r.registrationStatus,
    CheckedIn: r.checkedIn ? "YES" : "NO",
    RegisteredAt: r.createdAt,
  }));

  const parser = new Parser();

  return parser.parse(attendees);
};

export const downloadPDF = async (
  eventId,
  res
) => {
  const event = await Event.findByPk(eventId, {
    include: [
      {
        association: "registrations",
      },
    ],
  });

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  const doc = new PDFDocument({
    margin: 40,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${event.title}.pdf"`
  );

  doc.pipe(res);

  doc
    .fontSize(20)
    .text(event.title);

  doc.moveDown();

  doc
    .fontSize(14)
    .text(
      `Total Attendees: ${event.registrations.length}`
    );

  doc.moveDown();

  event.registrations.forEach((r, index) => {
    doc.fontSize(12).text(
      `${index + 1}. ${r.firstName} ${r.lastName}`
    );

    doc.text(`Email: ${r.email}`);
    doc.text(`Phone: ${r.phone}`);
    doc.text(`Ticket: ${r.ticketNumber}`);
    doc.text(`Payment: ${r.paymentStatus}`);
    doc.text(
      `Checked In: ${
        r.checkedIn ? "YES" : "NO"
      }`
    );

    doc.moveDown();
  });

  doc.end();
};