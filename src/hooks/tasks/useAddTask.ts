import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createNewTask } from '../../utils/tasks'

const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createNewTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export default useCreateTask
