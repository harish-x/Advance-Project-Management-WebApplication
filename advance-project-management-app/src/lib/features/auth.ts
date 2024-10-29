import { use } from "react";
import { reAuthQuery } from "./authQuery";
import { url } from "inspector";

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
    test: builder.query({
      query: () => "/auth/test",
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
        body: {password:data.password}
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useTestQuery,
  useLoginWithOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
