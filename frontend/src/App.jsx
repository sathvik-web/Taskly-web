// src/App.jsx
// Main application component with routing

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";

// Protected route component - redirects to login if no token
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the component
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginForm />} />

        {/* Signup page */}
        <Route path="/signup" element={<SignupForm />} />

        {/* Dashboard page (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect root path to dashboard or login */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
