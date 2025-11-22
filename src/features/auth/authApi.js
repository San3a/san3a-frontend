import { apiSlice } from "../../services/baseApi";
import { Auth } from "../../utils/apiEndpoints";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: Auth.LOGIN,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: Auth.REGISTER,
        method: "POST",
        body: data,
      }),
    }),


  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileQuery } =
  userApiSlice;
