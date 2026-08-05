import Joi from "joi";

export const verifyAccountSchema = Joi.object({
  bankCode: Joi.string().required(),

  accountNumber: Joi.string()
    .length(10)
    .required(),
});