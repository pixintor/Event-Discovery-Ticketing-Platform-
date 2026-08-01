/**
 * Send a successful API response.
 *
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object|array|null} data - Response payload
 */
export const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error API response.
 *
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object|array|null} errors - Validation errors
 */
export const errorResponse = (
  res,
  statusCode = 500,
  message = "Something went wrong",
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};