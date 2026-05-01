import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Sync state with DOM on load
  useEffect(() => {
    const html = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      html.classList.add("dark");
      setDark(true);
    } else {
      html.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}