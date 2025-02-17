import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../../utils/tasks'
import { Task } from '../../types/task'

const useTasks = (initialTasks?: Task[]) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    ...(initialTasks ? { initialData: initialTasks } : {}),
  })
}

export default useTasks
