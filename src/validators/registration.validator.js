import Joi from "joi";

export const createRegistrationSchema = Joi.object({
  ticketTypeId: Joi.string()
    .uuid()
    .required(),

  firstName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .trim()
    .required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .default(1),
});