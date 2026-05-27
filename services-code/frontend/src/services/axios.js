import axios from "axios";

// ======================================
// AXIOS INSTANCE
// ======================================

const API = axios.create({
  baseURL: "http://shop.local:9095/api",
});

// ======================================
// REQUEST INTERCEPTOR
// AUTO ADD TOKEN
// ======================================

API.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// AUTO LOGOUT ON 401
// ======================================

API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response && error.response.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
