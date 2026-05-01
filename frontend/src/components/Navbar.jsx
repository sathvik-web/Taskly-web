import { useNavigate } from "react-router-dom";
import { CheckSquare, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md transition">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Taskly
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 active:scale-95 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}