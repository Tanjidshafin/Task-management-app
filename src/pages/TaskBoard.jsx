"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import UseTasks from "../hooks/UseTasks"
import TaskColumn from "../components/TaskColumn"
import TaskFormModal from "../components/TaskFormModal"
import Notification from "../components/Notifications"

const categories = {
  "To-Do": { color: "bg-blue-500" },
  "In Progress": { color: "bg-yellow-500" },
  Done: { color: "bg-green-500" },
}

const TaskBoard = () => {
  const { tasks, isLoading, addTask, updateTask, deleteTask, reorderTasks } = UseTasks()
  const [activeTask, setActiveTask] = useState(null)
  const [modalTask, setModalTask] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [notification, setNotification] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  )

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t._id === event.active.id)
    setActiveTask(task)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeTask = tasks.find((t) => t._id === active.id)
    const overTask = tasks.find((t) => t._id === over.id)

    if (!activeTask) return

    if (overTask) {
      if (activeTask.category === overTask.category) {
        const tasksInCategory = tasks.filter((t) => t.category === activeTask.category)
        const oldIndex = tasksInCategory.findIndex((t) => t._id === activeTask._id)
        const newIndex = tasksInCategory.findIndex((t) => t._id === overTask._id)
        const reorderedTasks = arrayMove(tasksInCategory, oldIndex, newIndex)

        reorderTasks.mutate({
          category: activeTask.category,
          taskIds: reorderedTasks.map((t) => t._id),
        })
      } else {
        const updatedTask = { ...activeTask, category: overTask.category }
        updateTask.mutate(updatedTask)
        showNotification(`Task moved to ${overTask.category}`)
      }
    } else {
      const updatedTask = { ...activeTask, category: over.id }
      updateTask.mutate(updatedTask)
      showNotification(`Task moved to ${over.id}`)
    }
  }

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  const handleAddOrEditTask = (taskData) => {
    if (taskData._id) {
      updateTask.mutate(taskData)
      setNotification("Task has been updated")
    } else {
      addTask.mutate(taskData)
      setNotification("Task has been added")
    }
    setModalTask(null)
    setShowAddModal(false)
  }

  const handleDeleteTask = (taskId) => {
    deleteTask.mutate(taskId)
    setNotification("Task has been deleted")
  }

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category).sort((a, b) => a.order - b.order)
  }

  const showNotification = (message) => {
    setNotification(message)
  }
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }
  return (
    <div className="min-h-screen pt-20 bg-gray-100 dark:bg-gray-950 p-6">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {Object.keys(categories).map((category) => (
            <TaskColumn
              key={category}
              title={category}
              tasks={getTasksByCategory(category)}
              isLoading={isLoading}
              onAddTask={() => setShowAddModal(true)}
              onEditTask={(task) => setModalTask(task)}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-500 cursor-grabbing shadow-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activeTask.title}</h3>
              {activeTask.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1 line-clamp-2">{activeTask.description}</p>
              )}

              <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(activeTask.timestamp)}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AnimatePresence>
        {(showAddModal || modalTask) && (
          <TaskFormModal
            task={modalTask}
            onClose={() => {
              setModalTask(null)
              setShowAddModal(false)
            }}
            onSubmit={handleAddOrEditTask}
          />
        )}
      </AnimatePresence>

      <Notification message={notification} onClose={() => setNotification(null)} />
    </div>
  )
}

export default TaskBoard

