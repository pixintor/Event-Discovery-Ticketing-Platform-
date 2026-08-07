import { User, Event } from "../models/index.js";

import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import deleteImage from "../utils/deleteImage.js";

import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

/*
|--------------------------------------------------------------------------
| Upload Profile Picture
|--------------------------------------------------------------------------
*/

export const uploadProfilePicture = async (
  userId,
  file
) => {
  if (!file) {
    throw new BadRequestError("Please select an image.");
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  const image = await uploadToCloudinary(
    file.buffer,
    "event-platform/profile-pictures"
  );

  user.profilePicture = image.secure_url;
  user.profilePicturePublicId = image.public_id;

  await user.save();

  return {
    profilePicture: user.profilePicture,
  };
};

/*
|--------------------------------------------------------------------------
| Update Profile Picture
|--------------------------------------------------------------------------
*/

export const updateProfilePicture = async (
  userId,
  file
) => {
  if (!file) {
    throw new BadRequestError("Please select an image.");
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (user.profilePicturePublicId) {
    await deleteImage(user.profilePicturePublicId);
  }

  const image = await uploadToCloudinary(
    file.buffer,
    "event-platform/profile-pictures"
  );

  user.profilePicture = image.secure_url;
  user.profilePicturePublicId = image.public_id;

  await user.save();

  return {
    profilePicture: user.profilePicture,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Profile Picture
|--------------------------------------------------------------------------
*/

export const deleteProfilePicture = async (
  userId
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (user.profilePicturePublicId) {
    await deleteImage(user.profilePicturePublicId);
  }

  user.profilePicture = null;
  user.profilePicturePublicId = null;

  await user.save();
};

/*
|--------------------------------------------------------------------------
| Upload Event Banner
|--------------------------------------------------------------------------
*/

export const uploadEventBanner = async (
  organizerId,
  eventId,
  file
) => {
  if (!file) {
    throw new BadRequestError("Please select an image.");
  }

  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  if (event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only manage your own event banners."
    );
  }

  const image = await uploadToCloudinary(
    file.buffer,
    "event-platform/event-banners"
  );

  event.banner = image.secure_url;
  event.bannerPublicId = image.public_id;

  await event.save();

  return {
    banner: event.banner,
  };
};

/*
|--------------------------------------------------------------------------
| Update Event Banner
|--------------------------------------------------------------------------
*/

export const updateEventBanner = async (
  organizerId,
  eventId,
  file
) => {
  if (!file) {
    throw new BadRequestError("Please select an image.");
  }

  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  if (event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only manage your own event banners."
    );
  }

  if (event.bannerPublicId) {
    await deleteImage(event.bannerPublicId);
  }

  const image = await uploadToCloudinary(
    file.buffer,
    "event-platform/event-banners"
  );

  event.banner = image.secure_url;
  event.bannerPublicId = image.public_id;

  await event.save();

  return {
    banner: event.banner,
  };
};

/*
|--------------------------------------------------------------------------
| Delete Event Banner
|--------------------------------------------------------------------------
*/

export const deleteEventBanner = async (
  organizerId,
  eventId
) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  if (event.organizerId !== organizerId) {
    throw new ForbiddenError(
      "You can only manage your own event banners."
    );
  }

  if (event.bannerPublicId) {
    await deleteImage(event.bannerPublicId);
  }

  event.banner = null;
  event.bannerPublicId = null;

  await event.save();
};