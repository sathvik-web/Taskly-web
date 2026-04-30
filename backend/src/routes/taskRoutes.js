// src/routes/taskRoutes.js
// Defines task management endpoints (create, read, delete)
// All task routes require authentication

import express from "express";
import { createTask, getTasks, deleteTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware to all task routes
// This means all requests to these endpoints must include a valid JWT token
router.use(authMiddleware);

// POST /api/tasks
// Creates a new task for the authenticated user
// Body: { title }
router.post("/", createTask);

// GET /api/tasks
// Fetches all tasks for the authenticated user
router.get("/", getTasks);

// DELETE /api/tasks/:id
// Deletes a specific task
// Params: id (task ID)
router.delete("/:id", deleteTask);

export default router;
