import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().trim().min(5).max(200).required(),

  description: Joi.string().trim().min(20).required(),

  categoryId: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),

  venue: Joi.string().trim().required(),

  address: Joi.string().trim().required(),

  state: Joi.string().trim().required(),

  banner: Joi.string().optional().allow(""),

  startDate: Joi.date().required(),

  endDate: Joi.date().greater(Joi.ref("startDate")).required(),

  registrationDeadline: Joi.date()
    .less(Joi.ref("startDate"))
    .required(),

  capacity: Joi.number()
    .integer()
    .min(1)
    .required(),

  isPaid: Joi.boolean().required(),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().trim().min(5).max(200),

  description: Joi.string().trim().min(20),

  categoryId: Joi.string().guid({
    version: ["uuidv4"],
  }),

  venue: Joi.string(),

  address: Joi.string(),

  state: Joi.string(),

  banner: Joi.string().allow(""),

  startDate: Joi.date(),

  endDate: Joi.date(),

  registrationDeadline: Joi.date(),

  capacity: Joi.number().integer().min(1),

  isPaid: Joi.boolean(),

  isPublished: Joi.boolean(),

  status: Joi.string().valid(
    "DRAFT",
    "UPCOMING",
    "LIVE",
    "COMPLETED",
    "CANCELLED"
  ),
});