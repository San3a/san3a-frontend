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
  },
};

export const Auth = API_ENDPOINTS.AUTH;
export const Posts = API_ENDPOINTS.POSTS;
export const Offers = API_ENDPOINTS.OFFERS;
export const Category = API_ENDPOINTS.CATEGORY;
