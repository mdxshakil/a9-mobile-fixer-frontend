import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  prepareHeaders: (headers) => {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    if (auth) {
      headers.set("authorization", `Bearer ${auth?.accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    //logout user incase of forbidden or unauthorized access
    if (result.error?.status === 401 || result.error?.status === 403) {
      //   api.dispatch(userLoggedOut());
      localStorage.removeItem("auth");
    }
    return result;
  },
  endpoints: () => ({}),
  tagTypes: [
    "profile",
    "user",
    "users_profile",
    "all_users_profile",
    "blogs",
    "blog",
  ],
});
