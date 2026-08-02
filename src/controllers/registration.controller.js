import * as registrationService from "../services/registration.service.js";
import { createRegistrationSchema } from "../validators/registration.validator.js";

/**
 * Register for an Event
 */
export const registerForEvent = async (req, res, next) => {
  try {
    const { error } = createRegistrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await registrationService.createRegistration(
      req.params.registrationLink,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: result.event.isPaid
        ? "Registration created. Please complete payment."
        : "Registration completed successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Registration Details
 */
export const getRegistration = async (req, res, next) => {
  try {
    const registration =
      await registrationService.getRegistrationById(req.params.id);

    return res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Event Registrations
 */
export const getEventRegistrations = async (req, res, next) => {
  try {
    const registrations =
      await registrationService.getEventRegistrations(
        req.params.eventId,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel Registration
 */
export const cancelRegistration = async (req, res, next) => {
  try {
    const registration =
      await registrationService.cancelRegistration(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "Registration cancelled successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};