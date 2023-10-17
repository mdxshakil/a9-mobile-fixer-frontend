import { api } from "../../api/apiSlice";

const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (payload) => ({
        url: "/event/create-event",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["events"],
    }),
    getAllEvents: builder.query({
      query: () => ({
        url: "/event",
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    getUpcomingEvents: builder.query({
      query: () => ({
        url: "/event/upcoming-events",
        method: "GET",
      }),
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/event/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
    changeEventStatus: builder.mutation({
      query: ({ eventId, action }) => ({
        url: `/event/${eventId}?action=${action}`,
        method: "PATCH",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetUpcomingEventsQuery,
  useDeleteEventMutation,
  useChangeEventStatusMutation,
} = eventApi;
