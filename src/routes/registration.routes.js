import express from "express";

import {
  registerForEvent,
  getRegistration,
  getEventRegistrations,
  cancelRegistration,
} from "../controllers/registration.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Registration
|--------------------------------------------------------------------------
*/

router.post(
  "/:registrationLink",
  registerForEvent
);

/*
|--------------------------------------------------------------------------
| Organizer/Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/details/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORGANIZER),
  getRegistration
);

router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORGANIZER),
  getEventRegistrations
);

router.patch(
  "/:id/cancel",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORGANIZER),
  cancelRegistration
);

export default router;