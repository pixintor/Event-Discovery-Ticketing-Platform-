import axios from "axios";
import { sequelize } from "../models/index.js";
import {
  Registration,
  Event,
  TicketType,
} from "../models/index.js";

import { generateTicketNumber } from "../utils/generateTicketNumber.js";
import { generateQRCode } from "../utils/generateQRCode.js";

import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";


///////////// Initialize Payment

export const initializePayment = async (
  registrationId
) => {
  const registration =
    await Registration.findByPk(registrationId);

  if (!registration) {
    throw new NotFoundError(
      "Registration not found."
    );
  }

  if (registration.paymentStatus === "PAID") {
    throw new BadRequestError(
      "Registration has already been paid."
    );
  }

  const payload = {
    email: registration.email,

    amount:
      Number(registration.totalAmount) * 100,

    callback_url:
      process.env.PAYSTACK_CALLBACK_URL,

    metadata: {
      registrationId: registration.id,
    },
  };

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  registration.paymentReference =
    response.data.data.reference;

  await registration.save();

  return response.data.data;
};




///////// verify Payment

export const verifyPayment = async (reference) => {
  const transaction = await sequelize.transaction();

  try {
    // Verify with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data.data;

    if (payment.status !== "success") {
      throw new BadRequestError("Payment verification failed.");
    }

    // Find registration
    const registration = await Registration.findOne({
      where: {
        paymentReference: reference,
      },
      transaction,
    });

    if (!registration) {
      throw new NotFoundError("Registration not found.");
    }

    // Already paid
    if (registration.paymentStatus === "PAID") {
      await transaction.commit();
      return registration;
    }

    // Generate Ticket Number
    const ticketNumber = await generateTicketNumber(
      registration.eventId,
      registration.ticketTypeId
    );

    // Generate QR Code
    const qrCode = await generateQRCode({
      registrationId: registration.id,
      ticketNumber,
      eventId: registration.eventId,
      ticketTypeId: registration.ticketTypeId,
    });

    // Update Registration
    registration.paymentStatus = "PAID";
    registration.registrationStatus = "CONFIRMED";
    registration.ticketNumber = ticketNumber;
    registration.qrCode = qrCode;

    await registration.save({
      transaction,
    });

    await transaction.commit();

    return registration;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};