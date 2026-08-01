import Joi from "joi";

export const createTicketSchema = Joi.object({
  eventId: Joi.string().uuid().required(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .allow("", null),

  price: Joi.number()
    .min(0)
    .required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),

  salesStart: Joi.date().required(),

  salesEnd: Joi.date()
    .greater(Joi.ref("salesStart"))
    .required(),

  maxPerAttendee: Joi.number()
    .integer()
    .min(1)
    .default(1),
});

export const updateTicketSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),
    
  description: Joi.string()
    .allow("", null),

  price: Joi.number()
    .min(0),

  quantity: Joi.number()
    .integer()
    .min(1),

  salesStart: Joi.date(),

  salesEnd: Joi.date(),

  maxPerAttendee: Joi.number()
    .integer()
    .min(1),

  isActive: Joi.boolean(),
}).min(1);