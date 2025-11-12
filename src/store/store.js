import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/baseApi";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
