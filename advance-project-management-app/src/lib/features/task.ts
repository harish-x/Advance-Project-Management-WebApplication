import { headers } from "next/headers";
import { User } from "./auth";
import { reAuthQuery } from "./authQuery";
import { Project } from "./project";
import { use } from "react";

export interface Task {
  id: string;
  name: string;
  title?: string;
  description?: string;
  startDate: Date;
  dueDate?: Date;
  tags: string;
  desc: string;
  status: Status;
  priority: Priority;
  points?: number;
  authorUserId: string;
  assignedUserID: string;
  projectId: string;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface searchResults {
  task?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Attachment {
  id: string;
  fileUrl?: string;
  fileName?: string;
  taskId: string;
  uploadBy: User;
  createdAt: Date;
}

export enum Status {
  ToDO = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface Comment {
  id: string;
  text: string;
  taskId: string;
  authorUserId: string;
  createdAt: Date;
  user?: User;
}

export const TaskApi = reAuthQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], { projectId: string }>({
      query: (projectId) => `task/gettask?projectId=${projectId.projectId}`,
      providesTags: (result) =>
        result
          ? result.map((task) => ({ type: "Task" as const, id: task.id }))
          : [{ type: "Task", id: "LIST" }],
    }),

    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: `task/createTask`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation<Task, { status: string; taskId: string }>({
      query: ({ status, taskId }) => ({
        url: `/task/${taskId}/updateStatus`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),

    deleteTask: builder.mutation<Task, string>({
      query: (taskId) => ({
        url: `/task/delete/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    searchTasks: builder.query<searchResults, string>({
      query: (query) => `/search/tasks?query=${query}`,
    }),
    getSingleTask: builder.query<Task, string>({
      query: (taskId) => `/task/getsingleTask?taskId=${taskId}`,
    }),
    getComments: builder.query<Comment[], string>({
      query: (taskId) => `/task/comment/${taskId}`,

      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<
      Comment,
      { comment: string; taskId: string }
    >({
      query: ({ comment, taskId }) => ({
        url: `/task/comment/${taskId}`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: ["Comment"],
    }),

    getAttachments: builder.query<Attachment[], string>({
      query: (taskId) => `/task/attachment/${taskId}`,
      providesTags: ["Attachment"],
    }),
    createAttachments: builder.mutation<
      Attachment,
      { file: File; taskId: string }
    >({
      query: ({ file, taskId }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("taskId", taskId);

        return {
          url: `/task/attachment/${taskId}`,
          method: "POST",
          headers: {},
          body: formData,
        };
      },
      invalidatesTags: ["Attachment"],
    }),

    deleteComments: builder.mutation<Comment, string>({
      query: (commentId) => ({
        url: `/task/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteAttachments: builder.mutation<Attachment, string>({
      query: (attachmentId) => ({
        url: `/task/attachment/${attachmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attachment"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSearchTasksQuery,
  useGetSingleTaskQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useCreateAttachmentsMutation,
  useGetAttachmentsQuery,
  useDeleteAttachmentsMutation,
  useDeleteCommentsMutation
} = TaskApi;
