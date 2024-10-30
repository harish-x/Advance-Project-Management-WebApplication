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
    const { name, desc, startDate, finishedDate, teamId } = req.body;
    if (!name || !desc) {
      return next(new ErrorHandler("name and desc are required", 400));
    }
    try {
      const project = await ProjectServices.createProject({
      name,
      desc,
      startDate,
      finishedDate,
      teamId,
    });
    res.status(201).json({ project });
    } catch (error) {
      res.status(500).json({ message: "something went wrong",error });
    }
    
  }
);
