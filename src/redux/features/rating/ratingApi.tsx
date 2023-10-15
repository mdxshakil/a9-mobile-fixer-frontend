import { api } from "../../api/apiSlice";

const ratingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (payload) => ({
        url: "/rating/add-rating",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["check_rating"],
    }),
    checkRatingGivenOrNot: builder.query({
      query: ({ serviceId, profileId }) => ({
        url: `/rating/check-rating-status?serviceId=${serviceId}&profileId=${profileId}`,
        method: "GET",
      }),
      providesTags: ["check_rating"],
    }),
  }),
});

export const { useAddRatingMutation, useCheckRatingGivenOrNotQuery } =
  ratingApi;
