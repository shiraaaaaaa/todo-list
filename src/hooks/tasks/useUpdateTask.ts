import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../../utils/tasks'

const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export default useUpdateTask
