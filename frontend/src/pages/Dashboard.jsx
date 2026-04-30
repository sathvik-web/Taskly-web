// src/pages/Dashboard.jsx
// Dashboard page - main page where authenticated users see their tasks

import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Get current user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle logout
  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div>
      {/* Header with user info and logout button */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px 20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Welcome, {user?.name}! 👋</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Task list component */}
      <TaskList />
    </div>
  );
}
