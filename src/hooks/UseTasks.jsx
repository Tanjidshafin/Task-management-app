import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
const API_URL = "https://task-backend-psi-ten.vercel.app"
const UseTasks = () => {
  const queryClient = useQueryClient()

  const {
    data: tasks = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/tasks`)
      return res.data
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

  return { tasks, refetch, isFetching, addTask, updateTask, deleteTask }
}

export default UseTasks

