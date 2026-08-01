import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),

  description: Joi.string()
    .allow("")
    .optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),

  description: Joi.string()
    .allow("")
    .optional(),

  isActive: Joi.boolean(),
});