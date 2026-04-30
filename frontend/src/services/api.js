// src/services/api.js
// This file handles all HTTP requests to the backend
// Axios is used for making requests with automatic headers

import axios from "axios";

// Create axios instance with base URL from environment
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to every request if it exists in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH API CALLS
export const authAPI = {
  // Register a new user
  signup: (name, email, password) =>
    API.post("/auth/signup", { name, email, password }),

  // Login with email and password
  login: (email, password) =>
    API.post("/auth/login", { email, password }),
};

// TASK API CALLS
export const taskAPI = {
  // Get all tasks for the authenticated user
  getTasks: () =>
    API.get("/tasks"),

  // Create a new task
  createTask: (title) =>
    API.post("/tasks", { title }),

  // Delete a task by ID
  deleteTask: (id) =>
    API.delete(`/tasks/${id}`),
};

export default API;
