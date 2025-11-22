import { apiSlice } from "../../services";
import { Payment } from "../../utils/apiEndpoints";

export const checkoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        payForATechService: builder.mutation({
            query: (id) => ({
                url: Payment.PAY_FOR_A_TECH_SERVICE(id),
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        payForAnOffer: builder.mutation({
            query: (id) => ({
                url: Payment.PAY_FOR_AN_OFFER(id),
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        createServiceOrder: builder.mutation({
            query: (body) => ({
                url: Payment.CREATE_SERVICE_ORDER(),
                method: 'POST',
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        cancelPayment: builder.query({
            query: (id) => ({
                url: Payment.CANCEL_PAYMENT(id),
                method: 'GET',
            }),
        }),

    }),
});


export const {
    usePayForATechServiceMutation,
    useCreateServiceOrderMutation,
    useCancelPaymentQuery,
    usePayForAnOfferMutation,

} = checkoutApiSlice;