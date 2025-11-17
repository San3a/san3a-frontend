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
        }),

        getReviews: builder.query({
            query: (id) => ({
                url: Profile.getReviews(id),
                method: "GET"
            })
        })
    })
});

export const { 
    useProfileQuery, 
    usePastWorkQuery, 
    useUpdateProfileMutation, 
    useAddPastWorkMutation,
    useGetReviewsQuery
} =
    profileApiSlice;
