import { apiSlice } from "../../services/baseApi";
import { TechService } from "../../utils/apiEndpoints";

export const techServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTechServices: builder.query({
      query: (params) => ({
        url: TechService.GET_ALL,
        method: "GET",
        params,
      }),
    }),
    getTechServiceById: builder.query({
      query: (id) => ({
        url: TechService.GET_SPECIFIC(id),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTechServicesQuery, useGetTechServiceByIdQuery } =
  techServiceApiSlice;
