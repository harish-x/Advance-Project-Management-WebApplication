import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Project } from "@prisma/client";

type taskParamsT = {
  title: string;
  description: string;
  status: string;
  priority: string;
  tags: string;
  startDate: Date;
  dueDate: Date;
  projectId: string;
  points: string;
  authorUserId: string;
  assignedUserID: string;
  name: string;
};
class getAllTasks {
  async getAllTasks(projectId: string) {
    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      include: {
        assignee: {
          select: {
            userName: true,
            userId: true,
            email: true,
            profilePicture: true,
            assignedTasks: true,
            comments: true,
            teamId: true,
            attachments: true,
            role: true,
            authoredTasks: true,
            taskAssignment: true,
            team: true,
          },
        },
        author: {
          select: {
            userName: true,
            userId: true,
            email: true,
            profilePicture: true,
            assignedTasks: true,
            comments: true,
            teamId: true,
            attachments: true,
            role: true,
            authoredTasks: true,
            taskAssignment: true,
            team: true,
          },
        },
        comments: true,
        attachments: true,
      },
    });
    return tasks;
  }

  async createTask({
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
  }: taskParamsT) {
    const task = await prisma.task.create({
      data: {
        title,
        name,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        projectId,
        points: parseInt(points),
        authorUserId,
        assignedUserID,
      },
    });
    return task;
  }

  async updateTask({ status, taskId }: { status: string; taskId: string }) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        status,
      },
    });
    return task;
  }

  async getTaskById(taskId: string) {
    const tasks = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
      include: {
        assignee: {
          select: {
            userName: true,
            userId: true,
            email: true,
            profilePicture: true,
            assignedTasks: true,
            comments: true,
            teamId: true,
            attachments: true,
            role: true,
            authoredTasks: true,
            taskAssignment: true,
            team: true,
          },
        },
        author: {
          select: {
            userName: true,
            userId: true,
            email: true,
            profilePicture: true,
            assignedTasks: true,
            comments: true,
            teamId: true,
            attachments: true,
            role: true,
            authoredTasks: true,
            taskAssignment: true,
            team: true,
          },
        },
        comments: true,
        attachments: true,
      },
    });
    if (!tasks) {
      return false;
    }
    return tasks;
  }

  async createComment({
    comment,
    taskId,
    userId,
  }: {
    comment: string;
    taskId: string;
    userId: string;
  }) {
    const commants = await prisma.comment.create({
      data: {
        text: comment,
        taskId,
        userId,
      },
    });
    return commants;
  }

  async getComments(taskId: string) {
    const comments = await prisma.comment.findMany({
      where: {
        taskId,
      },
      include: {
        user: {
          select: {
            userName: true,
            userId: true,
            email: true,
          },
        },
      },
    });
    return comments;
  }

  async createAttachment({
    fileUrl,
    taskId,
    userId,
    fileName,
  }: {
    fileUrl: string;
    taskId: string;
    userId: string;
    fileName: string;
  }) {
    const attchment = await prisma.attachment.create({
      data: {
        fileUrl,
        taskId,
        uploadedBy: userId,
        fileName,
      },
    });
    return attchment;
  }
  async getAttachments(taskId: string) {
    const attachments = await prisma.attachment.findMany({
      where: {
        taskId,
      },
      include: {
        uploadBy: {
          select: {
            userName: true,
            userId: true,
            email: true,
          },
        },
      },
    });
    return attachments;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
        authorUserId: userId,
      },
    });
    return task;
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });
    return comment;
  }

  async deleteAttachment(commentId: string, userId: string) {
    const comment = await prisma.attachment.delete({
      where: {
        id: commentId,
        uploadedBy: userId,
      },
    });
    return comment;
  }
}

export default new getAllTasks();
