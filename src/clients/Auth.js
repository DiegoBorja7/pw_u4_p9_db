import axios from "axios";

const AUTH_URL = "/api/v1/auth/token";
const TOKEN_KEY = "accessToken";

const login = async () => {
  try {
    const response = await axios.post(AUTH_URL, {
      user: "admin",
      password: "admin123",
    });
    const { accessToken } = response.data;
    localStorage.setItem(TOKEN_KEY, accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error al obtener token:", error);
    throw error;
  }
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const ensureToken = async () => {
  let token = getToken();
  if (!token) {
    token = await login();
  }
  return token;
};

export default {
  login,
  getToken,
  ensureToken,
};
