import * as adminService from "../services/admin.service.js";
import ForbiddenError from "../errors/ForbiddenError.js";

export const dashboard = async (req, res, next) => {
  try {
    const data = await adminService.dashboard();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizers = async (req, res, next) => {
  try {
    const organizers =
      await adminService.getOrganizers();

    res.json({
      success: true,
      results: organizers.length,
      data: organizers,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleOrganizerStatus = async (
  req,
  res,
  next
) => {
  try {
    const organizer =
      await adminService.toggleOrganizerStatus(
        req.params.id
      );

    res.json({
      success: true,
      data: organizer,
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events =
      await adminService.getEvents();

    res.json({
      success: true,
      results: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrations = async (
  req,
  res,
  next
) => {
  try {
    const registrations =
      await adminService.getRegistrations();

    res.json({
      success: true,
      results: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

export const analytics = async (
  req,
  res,
  next
) => {
  try {
    const analytics =
      await adminService.analytics();

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

// /////get Transactions

export const getTransactions = async (
  req,
  res,
  next
) => {
  try {
    const transactions =
      await adminService.getTransactions();

    res.status(200).json({
      success: true,
      results: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};


////// revenue Report 

export const revenueReport = async (
  req,
  res,
  next
) => {
  try {
    const report =
      await adminService.revenueReport();

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

// //Creat Admin

export const createAdmin = async (
  req,
  res,
  next
) => {
  try {

if (req.user.adminLevel !== "SUPER_ADMIN") {
  throw new ForbiddenError(
    "Only Super Admins can perform this action."
  );
}

    const admin = await adminService.createAdmin(req.body);

    res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      data: admin,
    });

  } catch (error) {
    next(error);
  }
};