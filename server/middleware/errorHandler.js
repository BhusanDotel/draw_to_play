export const ERROR_HANDLER = (error, _, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error?.message || "An unexpected error occurred";

  if (error?.code === 11000) {
    message = `Duplicate field(s): ${Object.keys(error?.keyValue).join(", ")}`;
  }

  res.status(statusCode).json({
    message,
    stack: error.stack,
  });

  next();
};
