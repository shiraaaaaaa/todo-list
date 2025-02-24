import axios from 'axios'

import { Task } from '../types/task'

export const createNewTask = async (task: Omit<Task, '_id'>) => {
  const res = await axios.post('http://localhost:3000/task', task)
  const data = res.data
  return data
}

export const updateTask = async ({ id, update }: { id: string; update: Partial<Task> }) => {
  const res = await axios.put('http://localhost:3000/task/' + id, update)
  const data = res.data
  return data
}

export const deleteTask = async (id: string) => {
  const res = await axios.delete('http://localhost:3000/task/' + id)
  const data = res.data
  return data
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get('http://localhost:3000/task')
  const data = res.data
  return data
}
