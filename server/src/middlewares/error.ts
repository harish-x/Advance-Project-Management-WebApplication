import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: {
    [key: string]: { message: string };
  };
  path?: string;
  meta?: Record<string, any>;
}

const errorHandler = ( err: CustomError, req: Request, res: Response, next: NextFunction ): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Handling specific Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        message = `Duplicate field value: ${Object.keys(err.meta?.target || {}).join(", ")}`;
        statusCode = 409;
        break;
      case "P2025":
        message = "Resource not found";
        statusCode = 404;
        break;
      default:
        message = "Database request error";
        statusCode = 400;
        break;
    }
  }


  else if (err.name === "ValidationError" && err.errors) {
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    statusCode = 400;
  }

  // JWT and other specific errors
  else if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;

