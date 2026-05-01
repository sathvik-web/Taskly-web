import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) =>
    API.post("/auth/login", { email, password }),

  signup: (name, email, password) =>
    API.post("/auth/signup", { name, email, password }),
};

// Task APIs
export const taskAPI = {
  getTasks: () => API.get("/tasks"),
  createTask: (title) => API.post("/tasks", { title }),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
};

export default API;