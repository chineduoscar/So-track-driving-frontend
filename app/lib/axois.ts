import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.BACKEND_URL
    : "/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;