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
    changeUserRole: builder.mutation({
      query: (payload) => ({
        url: "/profile/change-user-role",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users_profile"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/profile/delete-user?userId=${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users_profile","all_users_profile"],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: `/profile/get-all-users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      providesTags: ["all_users_profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useEditProfileMutation,
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = profileApi;
