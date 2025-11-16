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
        })
    })
});

export const { useProfileQuery, usePastWorkQuery } = profileApiSlice;