import { apiSlice } from "../../services/baseApi";
import { Category } from "../../utils/apiEndpoints";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: Category.GET_ALL,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApiSlice;
