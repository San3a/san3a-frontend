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
      query: (page = 1) => `${Posts.GET_POSTS}?page=${page}&limit=10`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1) {
          return newItems;
        }
        const uniqueNewPosts = newItems.data.filter(
          (newItem) =>
            !currentCache.data.some(
              (cachedItem) => cachedItem._id === newItem._id
            )
        );
        currentCache.data.push(...uniqueNewPosts);
        currentCache.page = newItems.page;
        currentCache.totalPages = newItems.totalPages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Posts", id: _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
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
    updateOffer: builder.mutation({
      query: ({ postId, offerId, data }) => ({
        url: Offers.UPDATE_OFFER(postId, offerId),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Offers", id: postId },
        "Posts",
      ],
    }),
    deleteOffer: builder.mutation({
      query: ({ postId, offerId }) => ({
        url: Offers.DELETE_OFFER(postId, offerId),
        method: "DELETE",
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
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
