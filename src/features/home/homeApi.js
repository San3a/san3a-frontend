import { apiSlice } from "../../services/baseApi";
import { Home } from "../../utils/apiEndpoints";
export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopTechnicians: builder.query({
      query: () => ({
        url: Home.GET_TOP_TECHNICIANS,
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }),
    }),
  }),
});

export const { useGetTopTechniciansQuery } = homeApiSlice;
