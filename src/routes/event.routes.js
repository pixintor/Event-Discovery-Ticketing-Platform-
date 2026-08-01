import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
} from "../controllers/event.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAllEvents);

router.get(
  "/my-events",
  authenticate,
  authorize(ROLES.ORGANIZER),
  getMyEvents
);

router.get("/:id", getEventById);

/*
|--------------------------------------------------------------------------
| Organizer Routes
|--------------------------------------------------------------------------
*/



router.post(
  "/",
  authenticate,
  authorize(ROLES.ORGANIZER),
  createEvent
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ORGANIZER),
  updateEvent
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ORGANIZER),
  deleteEvent
);

router.patch(
  "/:id/publish",
  authenticate,
  authorize(ROLES.ORGANIZER),
  publishEvent
);

router.patch(
  "/:id/unpublish",
  authenticate,
  authorize(ROLES.ORGANIZER),
  unpublishEvent
);

export default router;