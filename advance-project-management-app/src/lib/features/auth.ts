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
  }),
});


export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useTestQuery 
} = authApiSlice;
