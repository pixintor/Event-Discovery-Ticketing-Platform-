import axios from "axios";
import crypto from "crypto";
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
import { calculatePlatformCommission } from "../utils/commission.js";
import { sendTicketEmail } from "../services/email.service.js";


///////////// Initialize Payment

export const initializePayment = async (
  registrationId
) => {
  const registration = await Registration.findByPk(registrationId, {
    include: [
      {
        association: "event",
        include: [
          {
            association: "organizer",
          },
        ],
      },
    ],
  });

  if (!registration) {
    throw new NotFoundError(
      "Registration not found."
    );
  }

  const organizer =
  registration.event.organizer;

if (!organizer) {
  throw new NotFoundError(
    "Organizer not found."
  );
}

if (!organizer.paymentSetupCompleted) {
  throw new BadRequestError(
    "Organizer has not completed payment setup."
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

  subaccount:
    organizer.paystackSubaccountCode,

  bearer: "subaccount",

  

  metadata: {
    registrationId: registration.id,
    organizerId: organizer.id,
    eventId: registration.event.id,
  },

    transaction_charge:
    calculatePlatformCommission(
      registration.totalAmount
    ),

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

    if (!payment) {
      throw new BadRequestError(
        "Invalid Paystack response."
      );
    }

    if (payment.status !== "success") {
      throw new BadRequestError(
        "Payment verification failed."
      );
    }

    // Find Registration
    const registration = await Registration.findOne({
      where: {
        paymentReference: reference,
      },
    });

    if (!registration) {
      throw new NotFoundError(
        "Registration not found."
      );
    }

    // Already paid
    if (registration.paymentStatus === "PAID") {
      return registration;
    }

    return await completeRegistrationPayment(registration);

  } catch (error) {  
    
  console.log("PAYSTACK ERROR:");
  console.log(error.response?.data || error.message);


    throw error;
  }
};

//////handle webhook

export const handleWebhook = async (req) => {

  // Verify Paystack Signature

  const hash = crypto
  .createHmac(
    "sha512",
    process.env.PAYSTACK_SECRET_KEY
  )
  .update(req.body)
  .digest("hex");

const signature =
  req.headers["x-paystack-signature"];

if (hash !== signature) {
  throw new BadRequestError(
    "Invalid Paystack signature."
  );
}

// Parse the Body
  const event = JSON.parse(
  req.body.toString()
);

// Ignore Unrelated Events
if (event.event !== "charge.success") {
  return;
}

// Get the Payment Reference
const reference =
  event.data.reference;

  // Find Registration
  const registration =
  await Registration.findOne({
    where: {
      paymentReference: reference,
    },
  });

if (!registration) {
  throw new NotFoundError(
    "Registration not found."
  );
}

// Prevent Duplicate Processing
if (
  registration.paymentStatus === "PAID"
) {
  return;
}

return await completeRegistrationPayment(registration);


};


////helper function.

export const completeRegistrationPayment = async (registration) => {
 // Generate Ticket Number
  const ticketNumber = await generateTicketNumber(
    registration.eventId,
    registration.ticketTypeId
  );
 // Generate QR code
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

  await registration.save();

  try {
  await sendTicketEmail(registration);
} catch (error) {
  console.error(
  "Ticket email failed:",
  error.message
);
}


  return registration;

  
};