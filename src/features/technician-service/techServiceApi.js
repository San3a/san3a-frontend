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
  }),
});

export const { useGetTechServicesQuery } = techServiceApiSlice;
