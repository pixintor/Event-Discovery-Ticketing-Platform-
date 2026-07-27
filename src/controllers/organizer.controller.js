import * as organizerService from "../services/organizer.service.js";

export const createOrganizer = async (req, res) => {
  try {
    const organizer = await organizerService.createOrganizer(req.body);

    res.status(201).json({
      success: true,
      message: "Organizer created successfully",
      data: organizer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await organizerService.getAllOrganizers();

    res.status(200).json({
      success: true,
      data: organizers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrganizerById = async (req, res) => {
  try {
    const organizer = await organizerService.getOrganizerById(req.params.id);

    res.status(200).json({
      success: true,
      data: organizer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrganizer = async (req, res) => {
  try {
    const organizer = await organizerService.updateOrganizer(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Organizer updated successfully",
      data: organizer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeOrganizerStatus = async (req, res) => {
  try {
    const organizer = await organizerService.changeOrganizerStatus(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: `Organizer ${
        organizer.isActive ? "activated" : "deactivated"
      } successfully`,
      data: organizer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};