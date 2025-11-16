import { apiSlice } from "../../services/baseApi";
import { Posts } from "../../utils/apiEndpoints";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: Posts.CREATE_POST,
        method: "POST",
        body: data,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: Posts.GET_POSTS,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery } = postsApiSlice;
