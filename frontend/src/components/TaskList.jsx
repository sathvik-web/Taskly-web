// src/components/TaskList.jsx
// Task list component - displays tasks and allows adding/deleting them

import { useState, useEffect } from "react";
import { taskAPI } from "../services/api";

export default function TaskList() {
  // State for tasks and form
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      return;
    }

    try {
      // Create task on backend
      const response = await taskAPI.createTask(newTask);

      // Add new task to list
      setTasks([response.data.task, ...tasks]);
      setNewTask(""); // Clear input
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      // Delete task from backend
      await taskAPI.deleteTask(id);

      // Remove task from list
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h2>My Tasks</h2>

      {/* Error message */}
      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </div>
      )}

      {/* Add new task form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Loading state */}
      {loading && <p>Loading tasks...</p>}

      {/* Tasks list */}
      <div>
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            No tasks yet. Add one to get started!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  marginBottom: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <div>
                  {/* Task title */}
                  <strong>{task.title}</strong>
                  {/* Task creation date */}
                  <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#999" }}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
