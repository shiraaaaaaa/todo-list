import { useQuery } from '@tanstack/react-query'

import { Task } from '../../types/task'
import { getTasks } from '../../utils/tasks'

const useTasks = (initialTasks?: Task[]) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    ...(initialTasks ? { initialData: initialTasks } : {}),
  })
}

export default useTasks
