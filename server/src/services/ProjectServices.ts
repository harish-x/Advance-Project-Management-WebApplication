import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProjectServices {
  async createProject({
    name,
    desc,
    startDate,
    DueDate,
    teamId,
    clientName,
    price,
  }: {
    name: string;
    desc: string;
    startDate: Date;
    DueDate: Date;
    teamId: number;
    clientName: string;
    price: number;
  }) {
    const project = await prisma.project.create({
      data: { name, desc, startDate, DueDate, clientName, price },
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
      include: {
        projectTeams: {
          include: {
            team: true,
          },
        },
      },
    });
    return project;
  }
  async getAllProjects(teamId: number) {
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
  async getnotprojectTeams(projectId: string) {
    const associatedTeams = await prisma.projectTeam.findMany({
      where: { projectId },
      select: { teamId: true },
    });
    const associatedTeamIds = associatedTeams.map(
      (projectTeam) => projectTeam.teamId
    );

    const teamsNotInProject = await prisma.team.findMany({
      where: {
        id: {
          notIn: associatedTeamIds,
        },
      },
    });

    return teamsNotInProject;
  }

  async getUserByprojectTeam(projectId: string) {
    const associatedTeams = await prisma.projectTeam.findMany({
      where: { projectId },
      select: { teamId: true },
    });
    console.log(projectId);
    const associatedTeamIds = associatedTeams.map(
      (projectTeam) => projectTeam.teamId
    );
    const users = await prisma.user.findMany({
      where: {
        teamId: {
          in: associatedTeamIds,
        },
      },
      select: {
        userName: true,
        email: true,
        userId: true,
        profilePicture: true,
        team: {
          select: {
            teamName: true,
          },
        },
      },
    });
    return users;
  }
  async deleteProject(projectId: string) {
    return prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }
  async updateProject({ projectId, name, desc, DueDate, finishedDate, status, clientName, price, }: { projectId: string; name: string; desc: string; DueDate: Date; finishedDate: Date; status: string; clientName: string; price: number; }) {
    return prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        desc,
        DueDate,
        finishedDate,
        status,
        clientName,
        price,
      },
    });
  }

}
export default new ProjectServices();
