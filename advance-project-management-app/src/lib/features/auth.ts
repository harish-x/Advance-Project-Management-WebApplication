import { use } from "react";
import { reAuthQuery } from "./authQuery";
import { url } from "inspector";
import { searchResults } from "./task";

export interface User {
  userId: string;
  userName: string;
  email: string;
  profilePicture?: string;
  teamId?: number;
  role: string;
  accessToken: string;
  team?: Team
}
export interface Team {
  teamName: string;
  id: number
}

type Allusers = User[] & {team:{ teamName: string }};

export const authApiSlice = reAuthQuery.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    checkUser: builder.query<User, void>({
      query: () => "/auth/getuser",
    }),
    loginWithOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/loginwithotp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verifyotp",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgotpassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { password: string; resetToken: string }) => ({
        url: `/auth/resetpassword/${data.resetToken}`,
        method: "POST",
        body: { password: data.password },
      }),
    }),
    searchUsers: builder.query<searchResults, string>({
      query: (query) => `/search/users?query=${query}`,
    }),
    getAllEmployes: builder.query<Allusers, void>({
      query: () => `/auth/getallusers`,
      providesTags: ["Users"],
    }),
    getAllTeams: builder.query<Team[], void>({
      query: () => `/auth/getAllTeams`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckUserQuery,
  useLoginWithOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSearchUsersQuery,
  useGetAllEmployesQuery,
  useGetAllTeamsQuery
} = authApiSlice;
