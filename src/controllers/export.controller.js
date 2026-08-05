import * as exportService from "../services/export.service.js";

export const exportCSV = async (
  req,
  res,
  next
) => {
  try {
    const csv =
      await exportService.downloadCSV(
        req.params.eventId
      );

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("attendees.csv");

    res.send(csv);
  } catch (error) {
    next(error);
  }
};

export const exportPDF = async (
  req,
  res,
  next
) => {
  try {
    await exportService.downloadPDF(
      req.params.eventId,
      res
    );
  } catch (error) {
    next(error);
  }
};