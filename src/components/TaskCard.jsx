"use client"
import { motion } from "framer-motion"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Edit, Trash2, GripVertical, Calendar } from "lucide-react"

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
          <div
            {...attributes}
            {...listeners}
            className="p-1 text-gray-400 cursor-grab active:cursor-grabbing touch-none"
          >
            <GripVertical size={16} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(task.timestamp)}</span>
        {task.dueDate && (
          <div className={`flex items-center text-xs ${isOverdue ? "text-red-500" : "text-green-500"}`}>
            <Calendar size={12} className="mr-1" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskCard

