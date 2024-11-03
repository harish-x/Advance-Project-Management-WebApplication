import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/store/redux";
import { setCredentials, logOut } from "@/lib/state/index";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = sessionStorage.getItem("access");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).global.user;
      sessionStorage.setItem("access", (refreshResult.data as any).accessToken);
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const reAuthQuery = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Projects", "Task", "Comment", "Attachment"],
  endpoints: (builder) => ({}),
});
