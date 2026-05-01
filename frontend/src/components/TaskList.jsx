import { useState, useEffect } from "react";
import { taskAPI } from "../services/api";
import TaskCard from "./TaskCard";
import { Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await taskAPI.getTasks();
      setTasks(res.data.tasks || res.data || []);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await taskAPI.createTask(newTask.trim());
      setTasks((prev) => [res.data.task || res.data, ...prev]);
      setNewTask("");
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow-lg transition">

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex gap-3">
          
          {/* Input with icon */}
          <div className="relative flex-1">
            <Plus className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 
              text-gray-800 dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>

          {/* Add button */}
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-700 active:scale-95 transition"
          >
            <Plus size={16} />
            Add
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mt-3 text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center mt-6 text-gray-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : tasks.length === 0 ? (

          /* Empty State */
          <div className="text-center text-gray-500 dark:text-gray-300 mt-6">
            <CheckCircle2 className="mx-auto mb-2" size={40} />
            <p className="text-lg">No tasks yet</p>
            <p className="text-sm">Add one to get started!</p>
          </div>

        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} onDelete={handleDeleteTask} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}