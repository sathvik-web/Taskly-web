// src/server.js
// Main Express application server
// This file sets up the server and connects all routes

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
// Parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
// This allows the frontend to make requests to this backend
app.use(cors({
  origin: "http://localhost:5173", // Vite dev server URL
  credentials: true,
}));

// ROUTES
// Authentication endpoints
app.use("/api/auth", authRoutes);

// Task management endpoints (require authentication)
app.use("/api/tasks", taskRoutes);

// Health check endpoint (no authentication required)
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling - catch all other routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure PostgreSQL is running and DATABASE_URL is set correctly`);
});
