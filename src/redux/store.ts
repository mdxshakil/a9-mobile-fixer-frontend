import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  devTools: import.meta.env.MODE === "development",
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
