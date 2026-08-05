import { Router } from "express";

import * as exportController from "../controllers/export.controller.js";

import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/csv/:eventId",
  authenticate,
  exportController.exportCSV
);

router.get(
  "/pdf/:eventId",
  authenticate,
  exportController.exportPDF
);

export default router;