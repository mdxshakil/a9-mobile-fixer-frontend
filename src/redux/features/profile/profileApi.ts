import { api } from "../../api/apiSlice";

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (profileId) => ({
        url: `/profile/get-profile/${profileId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
