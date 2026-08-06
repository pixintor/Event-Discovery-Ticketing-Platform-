import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/dashboard", adminController.dashboard);

router.get("/organizers", adminController.getOrganizers);

router.patch(
  "/organizers/:id/status",
  adminController.toggleOrganizerStatus
);

router.get("/events", adminController.getEvents);

router.get(
  "/registrations",
  adminController.getRegistrations
);

router.get("/analytics", adminController.analytics);

router.get(
  "/transactions",
  adminController.getTransactions
);

router.get(
  "/revenue-report",
  adminController.revenueReport
);

export default router;