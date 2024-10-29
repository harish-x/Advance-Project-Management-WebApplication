import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import ProjectServices from "../services/ProjectServices";

export const getProjects = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await ProjectServices.getAllProjects();
    if (!projects) {
      return next(new ErrorHandler("project not found", 404));
    }
    res.status(200).json({ projects });
  }
);

export const createProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, startDate, finishedDate, teamId } = req.body;
    if (!name || !description) {
      return next(new ErrorHandler("name and description are required", 400));
    }
    const project = await ProjectServices.createProject({
      name,
      description,
      startDate,
      finishedDate,
      teamId,
    });
    res.status(201).json({ project });
  }
);
