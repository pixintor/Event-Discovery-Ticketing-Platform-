import { errorResponse } from "../utils/response.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return errorResponse(
    res,
    statusCode,
    err.message || "Internal Server Error"
  );
};

export default errorMiddleware;