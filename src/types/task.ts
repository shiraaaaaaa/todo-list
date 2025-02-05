export type Task = {
  id: string
  description: string
  priority: number
  subjects: string[]
  dueDate: string
  isDone: boolean
  coordinates: [number, number]
}
