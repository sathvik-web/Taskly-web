// src/server.js
// Main Express application server

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());

// Parse incoming JSON
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure PostgreSQL is running and DATABASE_URL is set correctly`);
});