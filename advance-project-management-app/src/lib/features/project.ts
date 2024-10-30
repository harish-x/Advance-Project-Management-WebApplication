import { reAuthQuery } from "./authQuery";

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
        query: () => "projects",
        providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
        query: (project) => ({
            url: "projects",
            method: "POST",
            body: project,
        }),
        invalidatesTags: ["Projects"],
    }),
  }),
})

export const { useGetProjectsQuery, useCreateProjectMutation } = ProjectAPi