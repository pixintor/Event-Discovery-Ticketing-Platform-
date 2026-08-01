import * as eventService from "../services/event.service.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../validators/event.validator.js";

/**
 * Create Event
 */
export const createEvent = async (req, res, next) => {
  try {
    const { error } = createEventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const event = await eventService.createEvent(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Events
 */
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Event By ID
 */
export const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get My Events
 */
export const getMyEvents = async (req, res, next) => {
  try {
    const events = await eventService.getMyEvents(req.user.id);

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Event
 */
export const updateEvent = async (req, res, next) => {
  try {
    const { error } = updateEventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const event = await eventService.updateEvent(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Event
 */
export const deleteEvent = async (req, res, next) => {
  try {
    await eventService.deleteEvent(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Publish Event
 */
export const publishEvent = async (req, res, next) => {
  try {
    const event = await eventService.publishEvent(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Event published successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unpublish Event
 */
export const unpublishEvent = async (req, res, next) => {
  try {
    const event = await eventService.unpublishEvent(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Event unpublished successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};