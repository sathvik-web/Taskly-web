import { Trash2 } from "lucide-react";

export default function TaskCard({ task, onDelete }) {
  const id = task.id;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition duration-200">
      
      {/* Task Info */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {task.title}
        </h3>

        {task.createdAt && (
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {new Date(task.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Actions */}
      <button
        onClick={() => onDelete(id)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}