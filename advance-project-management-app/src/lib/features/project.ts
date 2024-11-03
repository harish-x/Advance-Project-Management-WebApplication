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
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation, useSearchProjectsQuery} = ProjectAPi