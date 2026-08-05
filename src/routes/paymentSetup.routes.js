import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  getBanks,
  verifyAccount,
  createSubaccount,
  getMyPaymentSetup,
} from "../controllers/paymentSetup.controller.js";

const router = express.Router();

router.use(authenticate);

router.get("/banks", getBanks);

router.post("/verify-account", verifyAccount);

router.post("/create-subaccount", createSubaccount);

router.get("/me", getMyPaymentSetup);

export default router;