import * as campaignService from "../services/campaign.service.js";

/**
 * Create Campaign
 */
export const createCampaign = async (
  req,
  res,
  next
) => {
  try {
    const campaign =
      await campaignService.createCampaign(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Campaign created successfully.",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Campaigns
 */
export const getCampaigns = async (
  req,
  res,
  next
) => {
  try {
    const campaigns =
      await campaignService.getCampaigns(
        req.user.id
      );

    res.json({
      success: true,
      results: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Campaign
 */
export const getCampaign = async (
  req,
  res,
  next
) => {
  try {
    const campaign =
      await campaignService.getCampaign(
        req.user.id,
        req.params.id
      );

    res.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};



export const sendCampaign = async (
  req,
  res,
  next
) => {
  try {
    const campaign =
      await campaignService.sendCampaign(
        req.user.id,
        req.params.id
      );

    res.json({
      success: true,
      message:
        "Campaign sent successfully.",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};