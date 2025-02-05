import { atom } from 'jotai'
import { Task } from '../types/task'
import { atomWithStorage } from 'jotai/utils'

export const tasksAtom = atomWithStorage<Task[]>('tasks', [])

export const updateTaskAtom = atom<null, [string, Partial<Task>], void>(
  null,
  (_get, set, id, updatedTask) => {
    set(tasksAtom, (tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    )
  },
)

export const addTaskAtom = atom<null, [Task], void>(
  null,
  (_get, set, newTask) => {
    set(tasksAtom, (tasks) => [...tasks, newTask])
  },
)

export const deleteTaskAtom = atom<null, [string], void>(
  null,
  (_get, set, id) => {
    set(tasksAtom, (tasks) => tasks.filter((task) => task.id !== id))
  },
)
