import * as uploadService from "../services/upload.service.js";

/**
 * Upload Profile Picture
 */
export const uploadProfilePicture = async (req, res, next) => {
  try {
    const result = await uploadService.uploadProfilePicture(
      req.user.id,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Profile Picture
 */
export const updateProfilePicture = async (req, res, next) => {
  try {
    const result = await uploadService.updateProfilePicture(
      req.user.id,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Profile Picture
 */
export const deleteProfilePicture = async (req, res, next) => {
  try {
    await uploadService.deleteProfilePicture(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Profile picture deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Event Banner
 */
export const uploadEventBanner = async (req, res, next) => {
  try {
    const result = await uploadService.uploadEventBanner(
      req.user.id,
      req.params.eventId,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Event banner uploaded successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Event Banner
 */
export const updateEventBanner = async (req, res, next) => {
  try {
    const result = await uploadService.updateEventBanner(
      req.user.id,
      req.params.eventId,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Event banner updated successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Event Banner
 */
export const deleteEventBanner = async (req, res, next) => {
  try {
    await uploadService.deleteEventBanner(
      req.user.id,
      req.params.eventId
    );

    return res.status(200).json({
      success: true,
      message: "Event banner deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};