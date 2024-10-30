import { User } from "./auth";
import { reAuthQuery } from "./authQuery";

export interface Task {
  id: string;
  name: string;
  title?: string;
  description?: string;
  stateDate: Date;
  dueDate?: Date;
  tags: string;
  desc: string;
  status: Status;
  priority: Priority;
  points?: string;
  authorUserId: string;
  assignedUserID: string;
  projectId: string;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  fileUrl?: string;
  fileName?: string;
  taskId: string;
  uploadedBy: string;
}

export enum Status {
  ToDO = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface Comment {
  id: string;
  text: string;
  taskId: string;
  authorUserId: string;
  author?: User;
}

export const TaskApi = reAuthQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], { projectId: string }>({
      query: (projectId) => `/task?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map((task) => ({ type: "Task" as const, id: task.id }))
          : [{ type: "Task", id: "LIST" }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: `/task`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { status: string; taskId: string }>({
      query: ({ status, taskId }) => ({
        url: `/task/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result,error,{taskId}) => [{ type: "Task", id: taskId }],
    }),
    deleteTask: builder.mutation<Task, string>({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskApi;
