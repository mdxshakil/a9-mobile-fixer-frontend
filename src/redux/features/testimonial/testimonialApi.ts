import { api } from "../../api/apiSlice";

const testimonialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTestimonial: builder.mutation({
      query: (payload) => ({
        url: "/testimonial/add-testimonial",
        method: "POST",
        body: payload,
      }),
    }),
    getAllTestimonial: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: `/testimonial/get-all-testimonial?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      providesTags: ["testimonials"],
    }),
    deleteTestimonial: builder.mutation({
      query: (testimonialId) => ({
        url: `/testimonial/${testimonialId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["testimonials"],
    }),
    approveUnApproveTestimonial: builder.mutation({
      query: ({ testimonialId, action }) => ({
        url: `/testimonial/${testimonialId}?action=${action}`,
        method: "PATCH",
      }),
      invalidatesTags: ["testimonials", "approved_testimonials"],
    }),
    getApprovedTestimonials: builder.query({
      query: () => ({
        url: `/testimonial/get-approved-testimonial`,
        method: "GET",
      }),
      providesTags: ["approved_testimonials"],
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useGetAllTestimonialQuery,
  useDeleteTestimonialMutation,
  useApproveUnApproveTestimonialMutation,
  useGetApprovedTestimonialsQuery,
} = testimonialApi;
