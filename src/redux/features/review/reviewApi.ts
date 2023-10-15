import { api } from "../../api/apiSlice";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (payload) => ({
        url: "/review/add-review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reviews"],
    }),
    getAllReview: builder.query({
      query: (serviceId) => ({
        url: `/review/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewQuery } = reviewApi;
