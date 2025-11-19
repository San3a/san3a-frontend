import { apiSlice } from "../../services/baseApi";
import { Admin } from "../../utils/apiEndpoints";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: Admin.GET_ALL_USERS,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getTechnicians: builder.query({
      query: (categoryId) => ({
        url: Admin.GET_TECHNICIANS,
        method: "GET",
        params: { categoryId },
      }),
      providesTags: ["Technicians"],
    }),

    banUser: builder.mutation({
      query: (id) => ({
        url: Admin.BAN_USER(id),
        method: "PATCH",
      }),
      invalidatesTags: ["Users", "Technicians"],
    }),

    unbanUser: builder.mutation({
      query: (id) => ({
        url: Admin.UNBAN_USER(id),
        method: "PATCH",
      }),
      invalidatesTags: ["Users", "Technicians"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: Admin.UPDATE_USER(id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getUserEarnings: builder.query({
      query: (id) => ({
        url: Admin.USER_EARNINGS(id),
        method: "GET",
      }),
      providesTags: ["UserEarnings"],
    }),

    getAdminCategories: builder.query({
      query: () => ({
        url: Admin.ADMIN_GET_CATEGORIES,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: Admin.ADMIN_CREATE_CATEGORY,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: Admin.ADMIN_UPDATE_CATEGORY(id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: Admin.ADMIN_DELETE_CATEGORY(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: Admin.GET_ALL_REVIEWS,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: Admin.DELETE_REVIEW(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),

    getCounts: builder.query({
      query: () => ({
        url: Admin.GET_COUNTS,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    getTechniciansPerCategory: builder.query({
      query: () => ({
        url: Admin.TECHNICIANS_PER_CATEGORY,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
    getTechnicianDemographics: builder.query({
      query: () => ({
        url: Admin.GET_TECHNICIAN_DEMOGRAPHICS,
        method: "GET",
      }),
    }),
    getUserDemographics: builder.query({
      query: () => ({
        url: Admin.GET_USER_DEMOGRAPHICS,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetTechniciansQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useUpdateUserMutation,
  useGetUserEarningsQuery,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useGetCountsQuery,
  useGetTechniciansPerCategoryQuery,
  useGetTechnicianDemographicsQuery,
  useGetUserDemographicsQuery,
} = adminApiSlice;
