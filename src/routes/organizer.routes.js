import express from "express";

import * as organizerController from "../controllers/organizer.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createOrganizerValidator,
  updateOrganizerValidator,
} from "../validators/organizer.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Protect all organizer routes
router.use(authenticate);
router.use(authorize(ROLES.ADMIN));

// Create Organizer
router.post(
  "/",
  createOrganizerValidator,
  validate,
  organizerController.createOrganizer
);

// Get All Organizers
router.get("/", organizerController.getAllOrganizers);

// Get Organizer by ID
router.get("/:id", organizerController.getOrganizerById);

// Update Organizer
router.put(
  "/:id",
  updateOrganizerValidator,
  validate,
  organizerController.updateOrganizer
);

// Activate / Deactivate Organizer
router.patch(
  "/:id/status",
  organizerController.changeOrganizerStatus
);

export default router;