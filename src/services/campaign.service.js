import {
  Campaign,
  Event,
  Registration,
} from "../models/index.js";

import NotFoundError from "../errors/NotFoundError.js";
import { sendEmail } from "./email.service.js";
import {sendCampaignEmail,} from "./email.service.js";

/**
 * Create Campaign
 */
export const createCampaign = async (
  organizerId,
  data
) => {
  const event = await Event.findOne({
    where: {
      id: data.eventId,
      organizerId,
    },
  });

  if (!event) {
    throw new NotFoundError(
      "Event not found."
    );
  }

  return await Campaign.create({
    organizerId,
    eventId: data.eventId,
    subject: data.subject,
    message: data.message,
  });
};

/**
 * Get Campaigns
 */
export const getCampaigns = async (
  organizerId
) => {
  return await Campaign.findAll({
    where: {
      organizerId,
    },
    include: [
      {
        association: "event",
        attributes: ["title"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Get Single Campaign
 */
export const getCampaign = async (
  organizerId,
  id
) => {
  const campaign =
    await Campaign.findOne({
      where: {
        id,
        organizerId,
      },
      include: [
        {
          association: "event",
        },
      ],
    });

  if (!campaign) {
    throw new NotFoundError(
      "Campaign not found."
    );
  }

  return campaign;
};


export const sendCampaign = async (
  organizerId,
  campaignId
) => {
  const campaign = await Campaign.findOne({
    where: {
      id: campaignId,
      organizerId,
    },
    include: [
      {
        association: "event",
      },
    ],
  });

  if (!campaign) {
    throw new NotFoundError(
      "Campaign not found."
    );
  }

  const attendees =
    await Registration.findAll({
      where: {
        eventId: campaign.eventId,
        paymentStatus: "PAID",
        registrationStatus: "CONFIRMED",
      },
    });

  let sent = 0;

  for (const attendee of attendees) {
    try {

      await sendCampaignEmail({
    to: attendee.email,
    firstName: attendee.firstName,
    subject: campaign.subject,
    message: campaign.message,
    event: campaign.event,
});


      sent++;
    } catch (err) {
      console.error(err.message);
    }
  }

  campaign.status = "SENT";
  campaign.sentAt = new Date();
  campaign.recipients = attendees.length;
  campaign.emailSent = sent;

  await campaign.save();

  return campaign;
};


