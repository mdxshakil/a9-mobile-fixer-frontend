import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewBlog: builder.mutation({
      query: (payload) => ({
        url: "/blog/add-new-blog",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blogs"],
    }),
    getAllBlogs: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: `/blog/get-all-blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
  }),
});

export const { useAddNewBlogMutation, useGetAllBlogsQuery } = blogApi;
