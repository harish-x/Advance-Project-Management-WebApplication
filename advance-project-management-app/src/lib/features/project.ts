import { Team, User } from "./auth";
import { reAuthQuery } from "./authQuery";
import { searchResults } from "./task";

export interface Project {
  id: string;
  name: string;
  clientName?: string;
  startDate: Date;
  DueDate?: Date;
  finishedDate?: Date;
  price?: number;
  desc: string;
  status: string;
}
export const ProjectAPi = reAuthQuery.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "project/getprojects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "project/createproject",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    searchProjects: builder.query<searchResults, string>({
      query: (query) => `/search/projects?query=${query}`,
    }),
    getNotProjectTeams: builder.query<Team[], string>({
      query: (projectId) => `project/getNotProjectTeams?projectId=${projectId}`,
    }),
    getProjectMembers: builder.query<User[], string>({
      query: (projectId) => `project/getprojectUsers?projectId=${projectId}`,
    }),
    getProject: builder.query<any, string>({
      query: (projectId) => `project/getproject?projectId=${projectId}`,
    }),
    inviteTeams: builder.mutation({
      query: (data) => ({
        url: "project/inviteTeam",
        method: "PUT",
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `project/delete/${projectId}`,
        method: "DELETE",
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `project/update/${data.projectId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation, useSearchProjectsQuery, useInviteTeamsMutation,useGetNotProjectTeamsQuery,useGetProjectMembersQuery,useGetProjectQuery,useDeleteProjectMutation,useUpdateProjectMutation} = ProjectAPi