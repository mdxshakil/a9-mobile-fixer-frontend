import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewBlog: builder.mutation({
      query: (payload) => ({
        url: "/blog/add-new-blog",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blogs", "latest_blogs"],
    }),
    getAllBlogs: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: `/blog/get-all-blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    getLatestBlogs: builder.query({
      query: () => ({
        url: "/blog/get-latest-blogs",
        method: "GET",
      }),
      providesTags: ["latest_blogs"],
    }),
    deleteBlogById: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs", "latest_blogs"],
    }),
    getBlogById: builder.query({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    editBlog: builder.mutation({
      query: ({ blogId, updatedData }) => ({
        url: `/blog/${blogId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["blogs", "blog", "latest_blogs"],
    }),
  }),
});

export const {
  useAddNewBlogMutation,
  useGetAllBlogsQuery,
  useDeleteBlogByIdMutation,
  useGetBlogByIdQuery,
  useEditBlogMutation,
  useGetLatestBlogsQuery,
} = blogApi;
