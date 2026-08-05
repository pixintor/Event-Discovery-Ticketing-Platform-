import * as paymentSetupService from "../services/paymentSetup.service.js";

import { verifyAccountSchema } from "../validators/paymentSetup.validator.js";

export const getBanks = async (req, res, next) => {
  try {
    const banks =
      await paymentSetupService.getBanks();

    return res.status(200).json({
      success: true,
      data: banks,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyAccount = async (
  req,
  res,
  next
) => {
  try {
    const { error } =
      verifyAccountSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const account =
      await paymentSetupService.verifyAccount(
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Account verified successfully.",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubaccount = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await paymentSetupService.createSubaccount(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Payment setup completed successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPaymentSetup = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await paymentSetupService.getMyPaymentSetup(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};