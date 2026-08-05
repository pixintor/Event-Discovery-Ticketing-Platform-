import * as paymentService from "../services/payment.service.js";

/**
 * Initialize Payment
 */
export const initializePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.initializePayment(
      req.params.registrationId
    );

    return res.status(200).json({
      success: true,
      message: "Payment initialized successfully.",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};


// export const initializePayment = async (req, res, next) => {
//   try {
//     const payment = await paymentService.initializePayment(
//       req.params.registrationId
//     );

//     return res.status(200).json({
//       success: true,
//       data: payment,
//     });
//   } catch (error) {
//     console.error("PAYMENT ERROR:");
//     console.error(error);

//     next(error);
//   }
// };



/**
 * Verify Payment
 */
export const verifyPayment = async (req, res, next) => {
  try {
    const registration =
      await paymentService.verifyPayment(
        req.query.reference
      );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Paystack Webhook
 */
export const webhook = async (req, res, next) => {
  try {
    await paymentService.handleWebhook(req);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};