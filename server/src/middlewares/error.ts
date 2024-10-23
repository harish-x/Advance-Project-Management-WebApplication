import { NextFunction, Request, Response } from "express";


interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: {
    [key: string]: { message: string };
  };
  path?: string;
  keyValue?: Record<string, unknown>;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let message = err.message || "Internal server error";
    let error = new Error(message) as CustomError;
    error.statusCode = err.statusCode;

    if (err.name === "ValidationError" && err.errors) {
      message = Object.values(err.errors)
        .map((value) => value.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "CastError" && err.path) {
      message = `Resource not found: ${err.path}`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.code === 11000 && err.keyValue) {
      message = `Duplicate key error: ${Object.keys(err.keyValue).join(", ")}`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "JsonWebTokenError") {
      message = "Invalid token";
      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export default errorHandler;
