import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProjectServices {
  async createProject({ name, desc, startDate, finishedDate, teamId }: { name: string; desc: string; startDate: Date; finishedDate: Date; teamId: number; }) {
    
    const project = await prisma.project.create({
      data: {
        name,
        desc,
        startDate,
        finishedDate
      },
    });
    return project;
  }
  async findProjectById(projectId: string) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return project;
  }
    async getAllProjects() {
      const projects = await prisma.project.findMany();
      return projects;
    }
}
export default new ProjectServices()