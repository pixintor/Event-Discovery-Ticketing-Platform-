import { Router } from "express";

import  authenticate 
from "../middleware/auth.middleware.js";

import authorize 
from "../middleware/role.middleware.js";

import { getEventAttendees }
from "../controllers/attendee.controller.js";

const router = Router();

router.get(
  "/:eventId",
  authenticate,
  authorize("ORGANIZER"),
  getEventAttendees
);

export default router;