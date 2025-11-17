/* eslint-disable */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token =
      getState().auth.token ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTQ1MTdiOWIxM2NmZjY1YmU2ZWI3MyIsImlhdCI6MTc2MzM2NDk3OSwiZXhwIjoxNzYzOTY5Nzc5fQ.KM4K_5Ru4tUgfp7RCELnp00g_f62Z95fbUqwLodmuik";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Don't set Content-Type for FormData - let the browser set it automatically
    // This ensures the multipart/form-data boundary is set correctly
    return headers;
  },
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});
