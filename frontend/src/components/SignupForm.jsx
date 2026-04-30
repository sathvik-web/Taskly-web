// src/components/SignupForm.jsx
// Signup form component - allows users to create a new account

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

export default function SignupForm() {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Call signup API
      const response = await authAPI.signup(name, email, password);

      // Save token to localStorage (used for authenticated requests)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Show error message if signup fails
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Sign Up</h2>

      {/* Error message display */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

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

        {/* Confirm password input */}
        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Link to login page */}
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
