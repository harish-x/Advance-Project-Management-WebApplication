import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProjectServices {
  async createProject({
    name,
    desc,
    startDate,
    finishedDate,
    teamId,
  }: {
    name: string;
    desc: string;
    startDate: Date;
    finishedDate: Date;
    teamId: number;
  }) {
    const project = await prisma.project.create({
      data: {
        name,
        desc,
        startDate,
        finishedDate,
      },
    });

    await prisma.projectTeam.create({
      data: {
        projectId: project.id,
        teamId,
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
  async getAllProjects(teamId:number) {
    const projects = await prisma.project.findMany({
      where: {
        projectTeams: {
          some: {
            teamId,
          },
        },
      },
      include: {
        tasks: true,
        projectTeams: {
          include: {
            team: true,
          },
        },
      },
    });
    return projects;
  }

  async addTeamsToProject(projectId: string, teamIds: number[]) {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        projectTeams: {
          create: teamIds.map((teamId) => ({
            teamId,
          })),
        },
      },
    });
    return project;
  }
}
export default new ProjectServices()