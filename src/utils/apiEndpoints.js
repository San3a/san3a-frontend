export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    PROFILE: "/auth/profile",
  },
  POSTS: {
    CREATE_POST: "/posts/",
    GET_POSTS: "/posts",
  },
  CATEGORY: {
    GET_ALL: "/categories",
    CREATE: "/categories",
    GET_SPECIFIC: (id) => `/categories/${id}`,
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
  },
};

export const Auth = API_ENDPOINTS.AUTH;
export const Posts = API_ENDPOINTS.POSTS;
export const Category = API_ENDPOINTS.CATEGORY;
