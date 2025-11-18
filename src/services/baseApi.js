/* eslint-disable */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token =
      getState().auth.token ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTRjYTU5NWYwNmM3MWZkYjRjNTNkMyIsImlhdCI6MTc2MzM4MjQ4MCwiZXhwIjoxNzYzOTg3MjgwfQ.-U_yWSPXR8Y6mw5rDNX6-5DuVVe1mx5neVnR971IHYg";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
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
  tagTypes: ["Auth", "Posts", "Offers"],
  endpoints: (builder) => ({}),
});
