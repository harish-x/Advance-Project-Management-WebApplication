import { use } from "react";
import { reAuthQuery } from "./authQuery";

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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useTestQuery, useLoginWithOtpMutation, useVerifyOtpMutation, } = authApiSlice;