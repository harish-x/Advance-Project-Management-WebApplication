import catchAsyncError from "../middlewares/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import TaskServices from "../services/TaskServices";
import ErrorHandler from "../utils/ErrorHandler";

export const getTasks = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.query.projectId as string;
    const tasks = await TaskServices.getAllTasks(projectId);
    if (!tasks) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json({ tasks });
  }
);

export const createTask = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      status,
      priority,
      tags,
      stateDate,
      dueDate,
      projectId,
      points,
      authorUserId,
      assignedUserID,
      name,
    } = req.body;
    if (!title || !description) {
      return next(new ErrorHandler("title and description are required", 400));
    }
    const task = await TaskServices.createTask({
      title,
      name,
      description,
      status,
      priority,
      tags,
      stateDate,
      dueDate,
      projectId,
      points,
      authorUserId,
      assignedUserID,
    });
    res.status(200).json({ task });
  }
);


export const updateTask = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, taskId } = req.body;
    const task = await TaskServices.updateTask({ status, taskId });
    if (!task) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json({ task });
  }
)