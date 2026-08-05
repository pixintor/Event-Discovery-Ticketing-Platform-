import { sendBulkCampaignEmail, sendCampaignEmail } from "../services/email.service.js";
import User from "../models/User.js"; 

/* Trigger a mass email campaign to all registered users
  POST /api/v1/campaigns/send-bulk
 */
export const triggerBulkCampaign = async (req, res) => {
  try {
    const { subject, templateName } = req.body;

    if (!subject || !templateName) {
      return res.status(400).json({
        success: false,
        message: "Subject and templateName are required fields.",
      });
    }

    // Fetch active users from database
    const users = await User.findAll({
      attributes: ["email", "firstName"],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipients found in the database.",
      });
    }

    // Execute bulk send via your email service
    await sendBulkCampaignEmail({
      recipients: users,
      subject,
      templateName,
    });

    return res.status(200).json({
      success: true,
      message: `Campaign successfully queued/sent to ${users.length} recipients.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to process campaign delivery.",
      error: error.message,
    });
  }
};

/**
 * Send a targeted campaign email to a single address
 * POST /api/v1/campaigns/send-single
 */
export const triggerSingleCampaign = async (req, res) => {
  try {
    const { email, subject, templateName, templateData } = req.body;

    if (!email || !subject || !templateName) {
      return res.status(400).json({
        success: false,
        message: "email, subject, and templateName are required.",
      });
    }

    await sendCampaignEmail({
      email,
      subject,
      templateName,
      templateData: templateData || {},
    });

    return res.status(200).json({
      success: true,
      message: `Campaign email sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send single campaign email.",
      error: error.message,
    });
  }
};

export default {
  triggerBulkCampaign,
  triggerSingleCampaign,
}