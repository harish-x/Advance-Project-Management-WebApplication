import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import SearchServices from "../services/SearchServices";

export const searchProjects = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body;
    if (!query) {
      return next(new ErrorHandler("query is required", 400));
    }
    const projects = await SearchServices.searchProjects(query);
    if (!projects) {
      return next(new ErrorHandler("project not found", 404));
    }
    res.status(200).json(projects);
  }
);

export const searchUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body;
    if (!query) {
      return next(new ErrorHandler("query is required", 400));
    }
    const users = await SearchServices.searchUsers(query);
    if (!users) {
      return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).json(users);
  }
);

export const searchTasks = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body;
    if (!query) {
      return next(new ErrorHandler("query is required", 400));
    }
    const tasks = await SearchServices.searchTasks(query);
    if (!tasks) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json(tasks);
  }
);
