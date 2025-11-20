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
      providesTags: (result) =>
        result
          ? [{ type: "TechServices", id: "LIST" }]
          : [{ type: "TechServices", id: "LIST" }],
    }),
    getTechServiceById: builder.query({
      query: (id) => ({
        url: TechService.GET_SPECIFIC(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TechService", id }],
    }),
    getTechServiceReviews: builder.query({
      query: ({ id, page = 1 }) => ({
        url: TechService.GET_REVIEWS(id),
        method: "GET",
        params: { page },
      }),
      providesTags: (result, error, { id, page }) => [
        { type: "TechService", id: `${id}-page-${page}` },
      ],
    }),
    addTechService: builder.mutation({
      query: (formData) => ({
        url: TechService.ADD_TECH_SERVICE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "TechServices", id: "LIST" }],
    }),
    addReview: builder.mutation({
      query: ({ rating, review, techService, user }) => ({
        url: TechService.ADD_REVIEW,
        method: "POST",
        body: { rating, review, techService, user },
      }),
      invalidatesTags: (result, error, { techService }) => [
        { type: "TechService", id: `${techService}-page-1` },
      ],
    }),
    editUserReview: builder.mutation({
      query: ({ reviewId, rating, review, techServiceId }) => ({
        url: TechService.EDIT_REVIEW(reviewId),
        method: "PATCH",
        body: { rating, review },
      }),
      invalidatesTags: (result, error, { techServiceId }) => [
        { type: "TechService", id: `${techServiceId}-page-1` },
      ],
    }),
    deleteUserReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: TechService.DELETE_REVIEW(reviewId),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { techServiceId }) => [
        { type: "TechService", id: `${techServiceId}-page-1` },
      ],
    }),
  }),
});

export const {
  useGetTechServicesQuery,
  useGetTechServiceByIdQuery,
  useGetTechServiceReviewsQuery,
  useAddReviewMutation,
  useEditUserReviewMutation,
  useDeleteUserReviewMutation,
  useAddTechServiceMutation,
} = techServiceApiSlice;
