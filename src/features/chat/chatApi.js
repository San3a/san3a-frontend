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

    uploadMessageImage: builder.mutation({
      query: ({ conversationId, file, author }) => {
        const formData = new FormData();
        formData.append("images", file);
        formData.append("conversationId", conversationId);
        formData.append("author", author);
        formData.append("content", "imageUrl");
        formData.append("type", "image");

        return {
          url: `/chat/${conversationId}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetAllConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUploadMessageImageMutation,
} = chatApiSlice;
