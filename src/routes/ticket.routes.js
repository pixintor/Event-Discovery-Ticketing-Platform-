import express from "express";

import {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsByEvent,
  updateTicket,
  deleteTicket,
  activateTicket,
  deactivateTicket,
} from "../controllers/ticket.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAllTickets);

router.get("/event/:eventId", getTicketsByEvent);

router.get("/:id", getTicketById);

/*
|--------------------------------------------------------------------------
| Organizer Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize(ROLES.ORGANIZER),
  createTicket
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ORGANIZER),
  updateTicket
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ORGANIZER),
  deleteTicket
);

router.patch(
  "/:id/activate",
  authenticate,
  authorize(ROLES.ORGANIZER),
  activateTicket
);

router.patch(
  "/:id/deactivate",
  authenticate,
  authorize(ROLES.ORGANIZER),
  deactivateTicket
);

export default router;