import { api } from "../../api/apiSlice";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["cart", "is_in_cart"],
    }),
    removeFromCart: builder.mutation({
      query: (blogId) => ({
        url: `/cart/remove-from-cart/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    getMyCart: builder.query({
      query: ({ profileId, page, limit, sortBy, sortOrder }) => ({
        url: `/cart/get-my-cart/${profileId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    getCartItem: builder.query({
      query: (cartItemId) => ({
        url: `/cart/get-cart-item/${cartItemId}`,
        method: "GET",
      }),
    }),
    isAlreadyInCart: builder.query({
      query: ({ serviceId, profileId }) => ({
        url: `/cart/is-in-cart/${serviceId}?profileId=${profileId}`,
        method: "GET",
      }),
      providesTags: ["is_in_cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetMyCartQuery,
  useGetCartItemQuery,
  useIsAlreadyInCartQuery,
} = cartApi;
