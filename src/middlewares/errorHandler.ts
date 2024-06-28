import { ErrorRequestHandler } from "express";
import { CustomError } from "../types";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  if (err instanceof CustomError) {
    res.status(err.status || 500).json({
      error: { message: err.message },
    });
  } else {
    res.status(500).json({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
