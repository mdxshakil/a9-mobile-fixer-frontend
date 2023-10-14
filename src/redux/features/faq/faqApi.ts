import { api } from "../../api/apiSlice";

const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewFaq: builder.mutation({
      query: (payload) => ({
        url: "/faq/add-new-faq",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["faqs"],
    }),
    getAllFaqs: builder.query({
      query: () => ({
        url: "/faq/get-all-faqs",
        method: "GET",
      }),
      providesTags: ["faqs"],
    }),
    deleteFaqById: builder.mutation({
      query: (faqId) => ({
        url: `/faq/${faqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faqs"],
    }),
    getFaqById: builder.query({
      query: (faqId) => ({
        url: `/faq/${faqId}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    editFaq: builder.mutation({
      query: ({ faqId, updatedData }) => ({
        url: `/faq/${faqId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["faqs", "faq"],
    }),
  }),
});

export const {
  useAddNewFaqMutation,
  useGetAllFaqsQuery,
  useDeleteFaqByIdMutation,
  useGetFaqByIdQuery,
  useEditFaqMutation,
} = faqApi;
