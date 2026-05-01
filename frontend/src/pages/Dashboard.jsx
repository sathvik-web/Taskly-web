import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your tasks efficiently and stay productive.
          </p>
        </div>

        <TaskList />
      </main>
    </div>
  );
}