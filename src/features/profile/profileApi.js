import { apiSlice } from "../../services";
import { Profile } from "../../utils/apiEndpoints";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => ({
                url: Profile.getProfile,
                method: "GET",
            }),
        }),

        pastWork: builder.query({  
            query: (userId) => ({
                url: Profile.getPastWork(userId),
                method: "GET",
                providesTags: ["PastWork"],
            }),
        }),
        
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: Profile.updateProfile(),
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }),
        }),
        
        addPastWork: builder.mutation({
            query: (formData) => ({
                url: Profile.addPastWork(),
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }),
            invalidatesTags: ["PastWork"],
        }),
        
        getReviews: builder.query({
            query: (id) => ({
                url: Profile.getReviews(id),
                method: "GET"
            })
        }),
        
        tagTypes: ["Posts"], 
        getPosts: builder.query({
            query: () => ({
                url: Profile.getPosts(),
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }),
            providesTags: ["Posts"], 
        }),
        
        createPost: builder.mutation({
            query: (formData) => ({
                url: Profile.addPost(),
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }),
            invalidatesTags: ["Posts"],
        }),
    }),
});

export const { 
    useProfileQuery, 
    usePastWorkQuery, 
    useUpdateProfileMutation, 
    useAddPastWorkMutation,
    useGetReviewsQuery,
    useGetPostsQuery,
    useCreatePostMutation
} =
    profileApiSlice;
