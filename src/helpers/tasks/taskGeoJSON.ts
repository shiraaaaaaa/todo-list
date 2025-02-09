import { Task } from '../../types/task'
import { createGeoJsonOfPoint } from '../geoJSON'

export const getTaskGeoJson = (task: Task) =>
  createGeoJsonOfPoint(task.coordinates, {
    name: task.description,
    isDone: task.isDone,
    id: task.id,
  })
