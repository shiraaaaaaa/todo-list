import axios from 'axios'

import { Task } from '../types/task'

const tasksUrlPath = '/api/task/'

export const createNewTask = async (task: Omit<Task, '_id'>) => {
  const { data } = await axios.post(tasksUrlPath, task)
  return data
}

export const updateTask = async ({ id, update }: { id: string; update: Partial<Task> }) => {
  const { data } = await axios.put(tasksUrlPath + id, update)
  return data
}

export const deleteTask = async (id: string) => {
  const { data } = await axios.delete(tasksUrlPath + id)
  return data
}

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(tasksUrlPath)
  return data
}
