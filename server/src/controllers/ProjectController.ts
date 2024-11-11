import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import ProjectServices from "../services/ProjectServices";

export const getProjects = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await ProjectServices.getAllProjects(req.user?.teamId as number);
    if (!projects) {
      return next(new ErrorHandler("project not found", 404));
    }
    res.status(200).json( projects );
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
    res.status(201).json(project);
    } catch (error) {
     return next(new ErrorHandler("something went wrong", 500));
    }
    
  }
);
export const getNotProjectTeams = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.query;
    if(!projectId){
      return next(new ErrorHandler("projectId is required", 400));
    }
    try {
      const project = await ProjectServices.getnotprojectTeams(projectId as string);
      res.status(201).json(project);
    } catch (error) {
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
)
export const addTeamsToProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, teamIds } = req.body;
    try {
      const project = await ProjectServices.addTeamsToProject(projectId, teamIds);
      res.status(201).json(project);
    } catch (error) {
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
);

export const getProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.query;
    if (!projectId) {
      return next(new ErrorHandler("projectId is required", 400));
    }
    try {
      const project = await ProjectServices.findProjectById(projectId as string);
      res.status(200).json(project);
    } catch (error) {
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
);

export const getUsersByProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.query;
    if (!projectId) {
      return next(new ErrorHandler("projectId is required", 400));
    }
    try {
      const project = await ProjectServices.getUserByprojectTeam(projectId as string);
      res.status(200).json(project);
    } catch (error) {
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
);

export const deleteProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    if (!projectId) {
      return next(new ErrorHandler("projectId is required", 400));
    }
    try {
      const project = await ProjectServices.deleteProject(projectId as string);
      res.status(200).json(project);
    } catch (error) {
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
);