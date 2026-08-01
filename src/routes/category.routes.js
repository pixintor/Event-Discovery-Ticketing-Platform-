import express from "express";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get("/", getCategories);

router.get("/:id", getCategory);

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  createCategory
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  updateCategory
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  deleteCategory
);

export default router;