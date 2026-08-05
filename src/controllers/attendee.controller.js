import * as attendeeService from "../services/attendee.service.js";

export const getEventAttendees = async (req, res, next) => {
  try {
    const attendees =
      await attendeeService.getEventAttendees(
        req.params.eventId,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      results: attendees.length,
      data: attendees,
    });

  } catch (error) {
    next(error);
  }
};