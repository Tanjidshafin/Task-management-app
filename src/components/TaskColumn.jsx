import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import TaskCard from "../components/TaskCard"

const categories = {
  "To-Do": { color: "bg-blue-500" },
  "In Progress": { color: "bg-yellow-500" },
  Done: { color: "bg-green-500" },
}

const TaskColumn = ({ title, tasks = [], onAddTask, isLoading, onEditTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  })

  return (
    <div ref={setNodeRef} className="flex-1 min-w-[250px] bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${categories[title].color}`} />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">{tasks.length}</span>
        </div>
        <button
          onClick={onAddTask}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Add task"
        >
          <Plus size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">No tasks yet</p>
        </div>
      ) : (
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

export default TaskColumn

