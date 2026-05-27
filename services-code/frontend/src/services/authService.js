import API from "./axios";

// ======================================
// API URLS
// ======================================

const AUTH_URL = "/auth";
const USER_URL = "/users";

// ======================================
// LOGIN
// ======================================

export const loginUser = async (data) => {

  const res = await API.post(
    `${AUTH_URL}/login`,
    data
  );

  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "role",
    res.data.role
  );

  localStorage.setItem(
    "user",
    res.data.email
  );

  return res;

};

// ======================================
// REGISTER
// ======================================

export const registerUser = async (data) => {

  return API.post(
    `${AUTH_URL}/register`,
    data
  );

};

// ======================================
// GET PROFILE
// ======================================

export const getProfile = async () => {

  return API.get(
    `${USER_URL}/profile`
  );

};

// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile = async (data) => {

  return API.put(
    `${USER_URL}/profile`,
    data
  );

};

// ======================================
// LOGOUT
// ======================================

export const logoutUser = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  window.location.href = "/login";

};

// ======================================
// HELPERS
// ======================================

export const getToken = () => {

  return localStorage.getItem("token");

};

export const getRole = () => {

  return localStorage.getItem("role");

};

export const getUser = () => {

  return localStorage.getItem("user");

};

export const isLoggedIn = () => {

  return !!localStorage.getItem("token");

};
