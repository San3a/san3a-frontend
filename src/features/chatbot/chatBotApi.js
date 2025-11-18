import { apiSlice } from "../../services/baseApi";
import { ChatBot } from "../../utils/apiEndpoints";

export const chatBotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendChatAi: builder.mutation({
      query: (data) => ({
        url: ChatBot.SEND_MESSAGE,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendChatAiMutation } = chatBotApiSlice;
