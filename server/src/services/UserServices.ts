import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();
type UserParamsT = {
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  teamId: number;
};
class UserServices {
  async CreateUser({
    userName,
    email,
    password,
    profilePicture,
    teamId,
  }: UserParamsT) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          userName,
          email,
          password: hashPassword,
          profilePicture,
          teamId,
        },
      });
      if (user) {
        const {
          password,
          resetPasswordToken,
          resetPasswordTokenExpired,
          otp,
          otpExpired,
          ...rest
        } = user;

        return rest;
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  generateAccessToken(userId: string, userRole: string) {
    return jwt.sign(
      { userId, role: userRole },
      process.env.ACCESSTOKEN_SECRET_KEY as string,
      { expiresIn: process.env.ACCESS_TOKENEXPIRES }
    );
  }
  generateRefreshToken(userId: string, userRole: string) {
    return jwt.sign(
      { userId, role: userRole },
      process.env.REFRESHTOKEN_SECRET_KEY as string,
      { expiresIn: process.env.REFRESH_TOKENEXPIRES }
    );
  }
  async finduserBytoken(decode: { userId: string; userRole: string }) {
    const user = await prisma.user.findFirst({
      where: {
        userId: decode.userId,
        role: decode.userRole,
      },
      include: {
        team: true,
      }
    });
    return user;
  }
  async findUserById(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
    });
    return user;
  }
  async findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async isValidUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        team: true,
      }
    });
    if (!user) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return false;
    }
    const {
      password: pswd,
      resetPasswordToken,
      resetPasswordTokenExpired,
      otp,
      otpExpired,
      ...rest
    } = user;
    return rest;
  }

  async generateResetPasswordToken(userId: string) {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpired: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    return token;
  }

  async isvalidResetPasswordTokenandUpdateIf(token: string, password: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpired: {
          gte: new Date(Date.now()),
        },
      },
    });
    if (!user) {
      return false;
    }
    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        password: await bcrypt.hash(password, 10),
        resetPasswordToken: null,
        resetPasswordTokenExpired: null,
      },
    });
    return user;
  }
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
        email: true,
        profilePicture: true,
        role: true,
        team: {
          select: {
            teamName: true,
          },
        },
      },
    });

    return users;
  }

  async getAllTeams() {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        teamName: true,
      },
    });
    return teams;
  }
}

export default new UserServices();
