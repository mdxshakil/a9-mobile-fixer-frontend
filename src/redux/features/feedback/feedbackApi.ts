import { api } from "../../api/apiSlice";

const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (payload) => ({
        url: "/feedback/add-feedback",
        method: "POST",
        body: payload,
      }),
    }),
    getAllFeedback: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: `/feedback/get-all-feedback?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddFeedbackMutation, useGetAllFeedbackQuery } = feedbackApi;
