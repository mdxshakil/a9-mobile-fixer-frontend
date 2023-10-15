import { api } from "../../api/apiSlice";

const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewService: builder.mutation({
      query: (payload) => ({
        url: "/service/add-new-service",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["services"],
    }),
    getAllService: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm, category }) => ({
        url: `/service/get-all-service?searchTerm=${searchTerm}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&category=${category}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    getUpcomingService: builder.query({
      query: () => ({
        url: "/service/get-upcoming-services",
        method: "GET",
      }),
    }),
    getHomePageServices: builder.query({
      query: () => ({
        url: "/service/get-homepage-services",
        method: "GET",
      }),
    }),
    getDashboardServices: builder.query({
      query: ({ page, limit, sortBy, sortOrder, filter }) => ({
        url: `/service/get-dashboard-services?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["dashboard_services"],
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `/service/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dashboard_services"],
    }),
    getServiceById: builder.query({
      query: (serviceId) => ({
        url: `/service/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    editService: builder.mutation({
      query: ({ serviceId, payload }) => ({
        url: `/service/${serviceId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["dashboard_services", "service"],
    }),
  }),
});

export const {
  useAddNewServiceMutation,
  useGetAllServiceQuery,
  useGetUpcomingServiceQuery,
  useGetHomePageServicesQuery,
  useGetDashboardServicesQuery,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useEditServiceMutation,
} = serviceApi;
