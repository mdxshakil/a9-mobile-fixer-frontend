import { api } from "../../api/apiSlice";

const ratingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (payload) => ({
        url: "/rating/add-rating",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["check_rating", "service_rating","service"],
    }),
    checkRatingGivenOrNot: builder.query({
      query: ({ serviceId, profileId }) => ({
        url: `/rating/check-rating-status?serviceId=${serviceId}&profileId=${profileId}`,
        method: "GET",
      }),
      providesTags: ["check_rating"],
    }),
    getRatingOfService: builder.query({
      query: (serviceId) => ({
        url: `/rating/get-service-rating/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["service_rating"],
    }),
  }),
});

export const {
  useAddRatingMutation,
  useCheckRatingGivenOrNotQuery,
  useGetRatingOfServiceQuery,
} = ratingApi;
