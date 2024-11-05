import catchAsyncError from "../middlewares/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import TaskServices from "../services/TaskServices";
import ErrorHandler from "../utils/ErrorHandler";
import { uploadImagesToAzure } from "../middlewares/FileUpload";

export const getTasks = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.query.projectId as string;
    const tasks = await TaskServices.getAllTasks(projectId);
    if (!tasks) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(201).json(tasks);
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
      startDate,
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
      startDate,
      dueDate,
      projectId,
      points,
      authorUserId,
      assignedUserID,
    });
    res.status(200).json(task);
  }
);

export const updateTask = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    const { taskId } = req.params;
    console.log(status, taskId);
    if (!status || !taskId) {
      return next(new ErrorHandler("status is required", 400));
    }
    const task = await TaskServices.updateTask({ status, taskId });
    if (!task) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json({ task });
  }
);

export const getSingleTask = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.query.taskId as string;
    console.log(taskId);
    if (!taskId) {
      return next(new ErrorHandler("taskId is required", 400));
    }
    const task = await TaskServices.getTaskById(taskId);
    if (!task) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json(task);
  }
);

export const createComment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment } = req.body;
    const { taskId } = req.params;
    if (!comment) {
      return next(new ErrorHandler("comment is required", 400));
    }
    if (!(await TaskServices.getTaskById(taskId))) {
      return next(new ErrorHandler("task not found", 404));
    }
    const task = await TaskServices.createComment({
      comment,
      taskId,
      userId: req.user?.userId as string,
    });
    if (!task) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json({ task });
  }
);

export const getComments = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    if (!taskId) {
      return next(new ErrorHandler("taskId is required", 400));
    }
    const comments = await TaskServices.getComments(taskId);
    if (!comments) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json(comments);
  }
);

export const createAttachment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;

    if (!(await TaskServices.getTaskById(taskId))) {
      return next(new ErrorHandler("task not found", 404));
    }
    const fileUrl = await uploadImagesToAzure(req.file as Express.Multer.File);

    if (!fileUrl) {
      return next(new ErrorHandler("Internal server Error", 500));
    }

    const attchment = await TaskServices.createAttachment({
      fileUrl,
      taskId,
      userId: req.user?.userId as string,
      fileName: req.file?.originalname as string,
    });
    if (!attchment) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json(attchment);
  }
);

export const getAttachments = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    if (!taskId) {
      return next(new ErrorHandler("taskId is required", 400));
    }
    const attachments = await TaskServices.getAttachments(taskId);
    if (!attachments) {
      return next(new ErrorHandler("task not found", 404));
    }
    res.status(200).json(attachments);
  }
);