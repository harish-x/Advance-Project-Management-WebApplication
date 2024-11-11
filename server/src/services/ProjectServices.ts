import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProjectServices {
  async createProject({ name, desc, startDate, finishedDate, teamId, }: { name: string; desc: string; startDate: Date; finishedDate: Date; teamId: number; }) {
    const project = await prisma.project.create({
      data: { name, desc, startDate, finishedDate, }
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
        }
      }
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

  async getUserByprojectTeam (projectId: string) {
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
    return users
  }
  deleteProject(projectId: string) {
    return prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }
}
export default new ProjectServices()