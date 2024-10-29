import catchAsyncError from "../middlewares/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import UserServices from "../services/UserServices";
import { sendUserToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailService";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("every fields are required", 402));
    }
    const user = await UserServices.isValidUser(email, password);
    if (!user) {
      return next(new ErrorHandler("invalid credentials", 401));
    }
    sendUserToken(user, 200, res);
  }
);

export const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  }
);

export const sendOtp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorHandler("email is required", 400));
    }
    const user = await UserServices.findUserByEmail(email);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        otp,
        otpExpired: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    await sendMail({
      email: user.email,
      subject: "OTP for password reset",
      message: `Your OTP is ${otp}`,
    });
    res.status(200).json({ message: "otp sent to your email" });
  }
);


export const verifyOtp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return next(new ErrorHandler("otp and email are required", 400));
    }
    const user = await UserServices.findUserByEmail(email);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
   const checkotp = await prisma.user.findFirst({
      where: {
        userId: user.userId,
        otp,
        otpExpired: {
          gte: new Date(Date.now())
        }
      },
   })

    if (!checkotp) {
      return next(new ErrorHandler("invalid otp or expired", 400));
    }
    sendUserToken(user, 200, res);
  }
);

export const getAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken)
      return next(new ErrorHandler("refresh token missing", 401));
    jwt.verify(
      refreshToken,
      process.env.REFRESHTOKEN_SECRET_KEY as string,
      async (err: any, decode: any) => {
        if (err) {
          return next(new ErrorHandler("refresh token is not valid", 401));
        }
        try {
          const user = await UserServices.finduserBytoken(decode);
          if (!user) return next(new ErrorHandler("User not found", 404));

          const accessToken = UserServices.generateAccessToken(
            user.userId,
            user.role
          );

          res.json({ accessToken });
        } catch (error) {
          return next(new ErrorHandler("Token refresh failed", 500));
        }
      }
    );
  }
);

export const test = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = req.user;
    res.status(200).json({ message: "working", user });
  }
);

export const forgotPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorHandler("email is required", 400));
    }

    const user = await UserServices.findUserByEmail(email);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    const resetToken = await UserServices.generateResetPasswordToken(user.userId);
    console.log(resetToken);
    
    try {
      const resetUrl = `${process.env.FRONTENDURL}${resetToken}`;
      const message = `<h1>Reset Password</h1>
  <p>Here the reset password link <a href=${resetUrl} target="_blank">click here</a></p> `;
      const subject = "Reset password for Jokar creations";
      sendMail({ email, subject, message });
      res.status(200).json({ message: "reset token sent to your email" });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

export const resetPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const token = req.params.resetToken;
    if (!password) {
      return next(new ErrorHandler("password is required", 400));
    }

    const resetPassword =
      await UserServices.isvalidResetPasswordTokenandUpdateIf(token, password);
    if (!resetPassword) {
      return next(new ErrorHandler("invalid token or expired", 400));
    }

    res.status(200).json({ message: "password reset successfully" });
  }
);
