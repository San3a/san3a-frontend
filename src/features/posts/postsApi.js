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
    }),
    updatePost: builder.mutation({
      query: ({ postId, data }) => ({
        url: Posts.UPDATE_POST(postId),
        method: "PATCH",
        body: data,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: Posts.GET_POSTS,
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }),
    }),
    getPostOffers: builder.query({
      query: (postId) => ({
        url: Offers.GET_POST_OFFERS(postId),
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }),
    }),
    addOfferToPost: builder.mutation({
      query: ({ postId, data }) => ({
        url: Offers.ADD_OFFER_TO_POST(postId),
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostOffersQuery,
  useAddOfferToPostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
