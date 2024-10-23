import { PrismaClient } from "@prisma/client";
import catchAsyncError from "../middlewares/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import UserServices from "../services/UserServices";

type UserParamsT = {
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  teamId: string;
};
const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password, profilePicture, teamId } = req.body;

    if (userName === "" || email === "" || password === "") {
      return next(new ErrorHandler("every fields are required", 402));
    }

        const user = await UserServices.CreateUser({ userName, email, password, profilePicture, teamId, });

        
        
  }
);
