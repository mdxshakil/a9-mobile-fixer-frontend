import { api } from "../../api/apiSlice";

const statApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/stat",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statApi;
