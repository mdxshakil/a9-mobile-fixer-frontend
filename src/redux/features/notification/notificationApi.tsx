import { api } from "../../api/apiSlice";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: (profileId) => ({
        url: `/notification/get-my-notification/${profileId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyNotificationsQuery } = notificationApi;
