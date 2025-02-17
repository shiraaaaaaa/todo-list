import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../../utils/tasks'

const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export default useDeleteTask
