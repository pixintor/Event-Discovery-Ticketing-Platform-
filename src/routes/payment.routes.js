import express from "express";

import {
  initializePayment,
  verifyPayment,
  webhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
  "/initialize/:registrationId",
  initializePayment
);

router.get(
  "/verify",
  verifyPayment
);


router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

export default router;