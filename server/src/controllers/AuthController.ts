import { PrismaClient } from "@prisma/client";
import catchAsyncError from "../middlewares/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import UserServices from "../services/UserServices";
import { sendUserToken } from "../utils/jwt";
import jwt from "jsonwebtoken"


export const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password, profilePicture, teamId } = req.body;

    if (userName === "" || email === "" || password === "") {
      return next(new ErrorHandler("every fields are required", 402));
    }

    const user = await UserServices.CreateUser({
      userName,
      email,
      password,
      profilePicture,
      teamId,
    });

    sendUserToken(user, 201, res);
  }
);

export const logout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  }
);

export const getAccessToken = catchAsyncError(async (req: Request, res: Response,next:NextFunction) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken)
    return next(new ErrorHandler("refresh token missing", 401));
  jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET_KEY as string,async (err: any, decode: any) => {
    if (err) {
      return next(new ErrorHandler("refresh token is not valid", 401));
    }
    try {
      const user = await UserServices.finduserBytoken(decode)
      if (!user) 
         return next(new ErrorHandler("User not found", 404));
      
      const accessToken = UserServices.generateAccessToken(user.userId, user.role)
      
      res.json({accessToken})

    } catch (error) {
      return next(new ErrorHandler("Token refresh failed", 500));
    }
  });
  
});
