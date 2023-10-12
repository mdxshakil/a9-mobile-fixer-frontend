import { api } from "../../api/apiSlice";

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (profileId) => ({
        url: `/profile/get-profile/${profileId}`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: ({ profileId, ...payload }) => ({
        url: `/profile/edit-profile/${profileId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
