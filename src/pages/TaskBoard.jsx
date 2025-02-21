"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import UseTasks from "../hooks/UseTasks"
import TaskColumn from "../components/TaskColumn"
import TaskFormModal from "../components/TaskFormModal"

const categories = {
  "To-Do": { color: "bg-blue-500" },
  "In Progress": { color: "bg-yellow-500" },
  Done: { color: "bg-green-500" },
}

const TaskBoard = () => {
  const { tasks, isFetching, addTask, updateTask, deleteTask, reorderTasks } = UseTasks()
  const [activeTask, setActiveTask] = useState(null)
  const [modalTask, setModalTask] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

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
        // Reordering within the same category
        const tasksInCategory = tasks.filter((t) => t.category === activeTask.category)
        const oldIndex = tasksInCategory.findIndex((t) => t._id === activeTask._id)
        const newIndex = tasksInCategory.findIndex((t) => t._id === overTask._id)
        const reorderedTasks = arrayMove(tasksInCategory, oldIndex, newIndex)

        reorderTasks.mutate({
          category: activeTask.category,
          taskIds: reorderedTasks.map((t) => t._id),
        })
      } else {
        // Moving to a different category
        const updatedTask = { ...activeTask, category: overTask.category }
        updateTask.mutate(updatedTask)
      }
    } else {
      // Dropping onto a column (over.id is the category name)
      const updatedTask = { ...activeTask, category: over.id }
      updateTask.mutate(updatedTask)
    }
  }

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  const handleAddOrEditTask = (taskData) => {
    if (taskData._id) {
      updateTask.mutate(taskData)
    } else {
      addTask.mutate(taskData)
    }
    setModalTask(null)
    setShowAddModal(false)
  }

  const handleDeleteTask = (taskId) => {
    deleteTask.mutate(taskId)
  }

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category).sort((a, b) => a.order - b.order)
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
              isLoading={isFetching}
              onAddTask={() => setShowAddModal(true)}
              onEditTask={(task) => setModalTask(task)}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-500 cursor-grabbing shadow-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{activeTask.title}</h3>
              {activeTask.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{activeTask.description}</p>
              )}
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
    </div>
  )
}

export default TaskBoard

