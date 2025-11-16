/* eslint-disable */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token =
      getState().auth.token ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTQ1MTdiOWIxM2NmZjY1YmU2ZWI3MyIsImlhdCI6MTc2MzI4NTQwMywiZXhwIjoxNzYzODkwMjAzfQ.0bNesYeV9OIRj_cjeLHfJ-zXzvG3qu2cjUVWmM4c13k";
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
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});
