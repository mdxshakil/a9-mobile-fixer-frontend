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
    getUsers: builder.query({
      query: ({ page, limit, sortBy, sortOrder, filter }) => ({
        url: `/profile/get-users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["users_profile"],
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

export const { useGetProfileQuery, useGetUsersQuery, useEditProfileMutation } =
  profileApi;
