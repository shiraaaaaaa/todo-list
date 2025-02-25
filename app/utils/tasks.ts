import axios from 'axios'

import { Task } from '../types/task'

const tasksUrlPath = '/api/task/'

export const createNewTask = async (task: Omit<Task, '_id'>) => {
  const res = await axios.post(tasksUrlPath, task)
  const data = res.data
  return data
}

export const updateTask = async ({ id, update }: { id: string; update: Partial<Task> }) => {
  const res = await axios.put(tasksUrlPath + id, update)
  const data = res.data
  return data
}

export const deleteTask = async (id: string) => {
  const res = await axios.delete(tasksUrlPath + id)
  const data = res.data
  return data
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(tasksUrlPath)
  const data = res.data
  return data
}
