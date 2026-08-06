import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import * as campaignController from "../controllers/campaign.controller.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("ORGANIZER"));

router.post(
  "/",
  campaignController.createCampaign
);

router.get(
  "/",
  campaignController.getCampaigns
);

router.get(
  "/:id",
  campaignController.getCampaign
);

router.post(
  "/:id/send",
  campaignController.sendCampaign
);

export default router;