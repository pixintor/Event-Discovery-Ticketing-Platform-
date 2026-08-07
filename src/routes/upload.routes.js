import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  uploadProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
  uploadEventBanner,
  updateEventBanner,
  deleteEventBanner,
} from "../controllers/upload.controller.js";

const router = express.Router();

router.use(authenticate);

// Profile
router.post(
  "/profile",
  upload.single("image"),
  uploadProfilePicture
);

router.put(
  "/profile",
  upload.single("image"),
  updateProfilePicture
);

router.delete(
  "/profile",
  deleteProfilePicture
);

// Event Banner
router.post(
  "/event-banner/:eventId",
  upload.single("image"),
  uploadEventBanner
);

router.put(
  "/event-banner/:eventId",
  upload.single("image"),
  updateEventBanner
);

router.delete(
  "/event-banner/:eventId",
  deleteEventBanner
);

export default router;