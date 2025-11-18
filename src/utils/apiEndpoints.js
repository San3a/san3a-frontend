export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    PROFILE: "/auth/profile",
  },
  POSTS: {
    CREATE_POST: "/posts/",
    GET_POSTS: "/posts/me",
    UPDATE_POST: (postId) => `/posts/${postId}`,
    DELETE_POST: (postId) => `/posts/${postId}`,
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
  OFFERS: {
    GET_POST_OFFERS: (postId) => `/posts/${postId}/offers`,
    ADD_OFFER_TO_POST: (postId) => `/posts/${postId}/offers`,
    UPDATE_OFFER: (postId, offerId) => `/posts/${postId}/offers/${offerId}`,
    DELETE_OFFER: (postId, offerId) => `/posts/${postId}/offers/${offerId}`,
  },
  ADMIN: {
    GET_ALL_USERS: "/admin/users",
    GET_TECHNICIANS: "/admin/technicians",
    BAN_USER: (id) => `/admin/users/${id}/ban`,
    UNBAN_USER: (id) => `/admin/users/${id}/unban`,
    UPDATE_USER: (id) => `/admin/users/${id}`,
    USER_EARNINGS: (id) => `/admin/users/${id}/earnings`,

    ADMIN_GET_CATEGORIES: "/admin/categories",
    ADMIN_CREATE_CATEGORY: "/admin/categories",
    ADMIN_UPDATE_CATEGORY: (id) => `/admin/categories/${id}`,
    ADMIN_DELETE_CATEGORY: (id) => `/admin/categories/${id}`,

    GET_ALL_REVIEWS: "/admin/reviews",
    DELETE_REVIEW: (id) => `/admin/reviews/${id}`,

    GET_COUNTS: "/admin/stats/counts",
    TECHNICIANS_PER_CATEGORY: "/admin/stats/technicians-per-category",
    GET_USER_DEMOGRAPHICS: "/admin/stats/user-demographics",
    GET_TECHNICIAN_DEMOGRAPHICS: "/admin/stats/technician-demographics",
  },
  TechService: {
    GET_ALL: "/tech-services",
  },
  ChatBot: {
    SEND_MESSAGE: "/chatbot",
  },
};

export const Auth = API_ENDPOINTS.AUTH;
export const Posts = API_ENDPOINTS.POSTS;
export const Offers = API_ENDPOINTS.OFFERS;
export const Chat = API_ENDPOINTS.CHAT;
export const Category = API_ENDPOINTS.CATEGORY;
export const Admin = API_ENDPOINTS.ADMIN;
export const TechService = API_ENDPOINTS.TechService;
export const ChatBot = API_ENDPOINTS.ChatBot;
