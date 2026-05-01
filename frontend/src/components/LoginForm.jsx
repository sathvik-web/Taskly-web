import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authAPI.login(email, password);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-gray-800 dark:from-gray-900 dark:to-gray-800 px-4 transition">
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transition">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Sign in
        </h2>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg 
            hover:bg-blue-700 active:scale-95 transition"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}