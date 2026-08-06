import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import authorize from "../middleware/role.middleware.js";

import { checkIn } from "../controllers/checkin.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ORGANIZER"),
  checkIn
);

export default router;