// src/controllers/taskController.js
// Handles task creation, viewing, and deletion

import prisma from "../prismaClient.js";

// CREATE: Add a new task for the authenticated user
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate input
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create task in database
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// GET: Fetch all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    // Fetch all tasks belonging to this user, ordered by newest first
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// DELETE: Remove a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    // Find the task
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if task exists and belongs to current user (security check)
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this task" });
    }

    // Delete the task
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
