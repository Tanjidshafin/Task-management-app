"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect } from "react"
import socket from "../../socketio"
import { AppContext } from "../context/AppContext"


const API_URL = "https://task-backend-erwi.onrender.com"

const UseTasks = () => {
  const queryClient = useQueryClient()
  const { user } = useContext(AppContext)
  useEffect(() => {
    socket.on("taskAdded", (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => [...oldTasks, newTask])
    })

    socket.on("taskDeleted", (deletedTaskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => oldTasks.filter((task) => task._id !== deletedTaskId))
    })

    socket.on("taskUpdated", (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
      )
    })

    socket.on("tasksReordered", ({ category, taskIds }) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        const updatedTasks = [...oldTasks]
        taskIds.forEach((id, index) => {
          const taskIndex = updatedTasks.findIndex((task) => task._id === id)
          if (taskIndex !== -1) {
            updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], order: index, category }
          }
        })
        return updatedTasks
      })
    })

    return () => {
      socket.off("taskAdded")
      socket.off("taskDeleted")
      socket.off("taskUpdated")
      socket.off("tasksReordered")
    }
  }, [queryClient])

  const {
    data: tasks = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/tasks`)
      const filtered = res.data.filter(task => task.email === user.email)
      return filtered
    },
  })

  const addTask = useMutation({
    mutationFn: (newTask) => axios.post(`${API_URL}/tasks`, newTask),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  const updateTask = useMutation({
    mutationFn: (updatedTask) => axios.put(`${API_URL}/tasks/${updatedTask._id}`, updatedTask),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  const deleteTask = useMutation({
    mutationFn: (taskId) => axios.delete(`${API_URL}/tasks/${taskId}`),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  const reorderTasks = useMutation({
    mutationFn: (reorderData) => axios.post(`${API_URL}/tasks/reorder`, reorderData),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  return { tasks, refetch, isFetching, addTask, updateTask, deleteTask, reorderTasks }
}

export default UseTasks

