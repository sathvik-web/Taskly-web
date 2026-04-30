// src/components/LoginForm.jsx
// Login form component - allows users to sign in with email and password

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

export default function LoginForm() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call login API
      const response = await authAPI.login(email, password);

      // Save token to localStorage (used for authenticated requests)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Show error message if login fails
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>

      {/* Error message display */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Password input */}
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Link to signup page */}
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
