import { apiSlice } from "../../services/baseApi";
import { Offers, Posts } from "../../utils/apiEndpoints";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: Posts.CREATE_POST,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, data }) => ({
        url: Posts.UPDATE_POST(postId),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: Posts.DELETE_POST(postId),
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: Posts.GET_POSTS,
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }),
      providesTags: ["Posts"],
    }),
    getPostOffers: builder.query({
      query: (postId) => ({
        url: Offers.GET_POST_OFFERS(postId),
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }),
      providesTags: (result, error, postId) => [{ type: "Offers", id: postId }],
    }),
    addOfferToPost: builder.mutation({
      query: ({ postId, data }) => ({
        url: Offers.ADD_OFFER_TO_POST(postId),
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Offers", id: postId },
        "Posts",
      ],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostOffersQuery,
  useAddOfferToPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
