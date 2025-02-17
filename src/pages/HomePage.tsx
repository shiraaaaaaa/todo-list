import { useMemo, useState } from 'react'
import TasksMap from '../components/TasksMap'
import { Task } from '../types/task'
import TaskCard from '../components/TaskCard'
import { Box } from '@mui/material'
import useTasks from '../hooks/tasks/useTasks'

function HomePage() {
  const [selectedTaskId, setSelectedTask] = useState<string | null>(null)

  const { data: tasks, status, error } = useTasks()

  const selectedTask = useMemo(
    () => (tasks ? tasks.find((task: Task) => task._id === selectedTaskId) : null),
    [selectedTaskId, tasks],
  )

  if (status === 'pending') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="80%"
      gap="20px"
      margin="auto"
    >
      <TasksMap tasks={tasks} onSelect={setSelectedTask} />
      <Box width="100%">{selectedTask ? <TaskCard task={selectedTask} /> : null}</Box>
    </Box>
  )
}

export default HomePage
