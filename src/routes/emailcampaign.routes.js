import express from "express";
import {
  triggerBulkCampaign,
  triggerSingleCampaign,
} from "../controllers/emailCampaignController.js";

const router = express.Router();


router.post(
  "/send-bulk", 
  triggerBulkCampaign
);


router.post(
  "/send-single", 
  // protect, isAdmin, // Uncomment if using auth middleware
  triggerSingleCampaign
);

export default router;