import * as checkinService from "../services/checkin.service.js";

export const checkIn = async (req, res, next) => {
  try {
    const { ticketNumber } = req.body;

    const registration =
      await checkinService.checkInAttendee(ticketNumber);

    res.status(200).json({
      success: true,
      message: "Check-in successful.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};