import { apiSlice } from "../../services/baseApi";
import { Chat } from "../../utils/apiEndpoints";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
      query: (data) => ({
        url: Chat.Conversation,
        method: "POST",
        body: data,
      }),
    }),

    getAllConversations: builder.query({
      query: (userId) => `${Chat.AllConversations.replace(":userId", userId)}`,
    }),

    getMessages: builder.query({
      query: (conversationId) =>
        `${Chat.ConversationMessages.replace(
          ":conversationId",
          conversationId
        )}`,
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${Chat.SendMessage}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetAllConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
