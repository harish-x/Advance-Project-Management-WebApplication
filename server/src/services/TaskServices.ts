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

  async createTask({ title, description, status, priority, tags, startDate, dueDate, projectId, points, authorUserId, assignedUserID, name, }: taskParamsT) {
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
        points:parseInt(points),
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
    return tasks;
  }
}

export default new getAllTasks();
