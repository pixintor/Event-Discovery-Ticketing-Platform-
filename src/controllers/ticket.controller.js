import * as ticketService from "../services/ticket.service.js";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validators/ticket.validator.js";

/**
 * Create Ticket
 */
export const createTicket = async (req, res, next) => {
  try {
    const { error } = createTicketSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const ticket = await ticketService.createTicket(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully.",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Tickets
 */
export const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await ticketService.getAllTickets();

    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Ticket By ID
 */
export const getTicketById = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Tickets By Event
 */
export const getTicketsByEvent = async (req, res, next) => {
  try {
    const tickets = await ticketService.getTicketsByEvent(
      req.params.eventId
    );

    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Ticket
 */
export const updateTicket = async (req, res, next) => {
  try {
    const { error } = updateTicketSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const ticket = await ticketService.updateTicket(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully.",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Ticket
 */
export const deleteTicket = async (req, res, next) => {
  try {
    await ticketService.deleteTicket(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Activate Ticket
 */
export const activateTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.activateTicket(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Ticket activated successfully.",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deactivate Ticket
 */
export const deactivateTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.deactivateTicket(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Ticket deactivated successfully.",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};


