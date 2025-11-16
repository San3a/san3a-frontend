export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    // PROFILE: "/auth/profile",
  },
  CHAT: {
    Conversation: "/chat",
    AllConversations: "/chat/:userId",
    ConversationMessages: "/chat/messages/:conversationId",
    SendMessage: "/chat/messages",
  },
  CATEGORY: {
    GET_ALL: "/categories",
    CREATE: "/categories",
    GET_SPECIFIC: (id) => `/categories/${id}`,
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
  },
  PROFILE: {
    getProfile: '/profile',
    getPastWork: (id) => `/users/past-work/${id}`
  }

};

export const Auth = API_ENDPOINTS.AUTH;
export const Chat = API_ENDPOINTS.CHAT;
export const Category = API_ENDPOINTS.CATEGORY;
export const Profile = API_ENDPOINTS.PROFILE;