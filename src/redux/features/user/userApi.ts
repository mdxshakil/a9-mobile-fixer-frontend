import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => ({
        url: `/user/get-user/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    editUserEmail: builder.mutation({
      query: ({ userId, newEmail }) => ({
        url: `/user/edit-user-email/${userId}`,
        method: "PATCH",
        body: { newEmail },
      }),
      invalidatesTags: ["all_users_profile","user"],
    }),
  }),
});

export const { useGetUserByIdQuery, useEditUserEmailMutation } = userApi;
