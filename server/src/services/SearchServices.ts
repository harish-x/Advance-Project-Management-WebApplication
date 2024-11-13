import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Project } from "@prisma/client";

class SearchServices {
  async searchProjects(query: string) {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { desc: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return projects;
  }

  async searchTasks(query: string) {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return tasks;
  }
    
    async searchUsers(query: string) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { userName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
      });
      return users;
    }
}

export default new SearchServices();
