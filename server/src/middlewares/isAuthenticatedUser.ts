import { NextFunction, Request, Response } from "express";
import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import UserServices from "../services/UserServices";

const isAuthenticatedUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const tokenHeader = Array.isArray(authHeader)
        ? authHeader[0]
        : authHeader;
      if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
        const token = tokenHeader.split(" ")[1];

        if (!token) {
          return next(new ErrorHandler("missing token", 401));
        }
        jwt.verify(
          token,
          process.env.ACCESSTOKEN_SECRET_KEY as string,
          async (err: any, decoded: any) => {
            console.log(err);
            if (err) {
              return next(new ErrorHandler("Invalid or expired token", 403));
            }

            try {
              const user = await UserServices.finduserBytoken(decoded);

              if (!user) {
                return next(new ErrorHandler("User not found", 404));
              }
               req.user = user;
              next();
            } catch (error) {
              return next(new ErrorHandler("Authentication failed", 500));
            }
          }
        );
      } else {
        return next(new ErrorHandler("Authentication failed", 401));
      }
    } catch (error) {
      return next(new ErrorHandler("Authentication failed", 500));
    }
  }
);

export default isAuthenticatedUser;
