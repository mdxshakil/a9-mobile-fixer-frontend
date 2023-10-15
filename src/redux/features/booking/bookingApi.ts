import { api } from "../../api/apiSlice";

const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkRemainingSlots: builder.query({
      query: ({ serviceId, bookingTime }) => ({
        url: `/booking/check-remaining-slots?serviceId=${serviceId}&bookingTime=${bookingTime}`,
        method: "GET",
      }),
    }),
    confirmBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking/confirm-booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["cart", "bookings"],
    }),
    getMyBookings: builder.query({
      query: (profileId) => ({
        url: `/booking/my-bookings/${profileId}`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    getAllBookings: builder.query({
      query: ({ page, limit, sortBy, sortOrder, filter }) => ({
        url: `/booking/get-all-bookings?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["all_bookings"],
    }),
    updateBookingStatus: builder.mutation({
      query: (payload) => ({
        url: "/booking/update-booking-status",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["all_bookings"],
    }),
    getSingleBooking: builder.query({
      query: ({ serviceId, profileId }) => ({
        url: `/booking/single-booking-info?serviceId=${serviceId}&profileId=${profileId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCheckRemainingSlotsQuery,
  useConfirmBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetSingleBookingQuery,
} = bookingApi;
