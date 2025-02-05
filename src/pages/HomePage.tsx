import { useMemo, useState } from 'react'
import TasksMap from '../components/TasksMap'
import { Task } from '../types/task'
import TaskCard from '../components/TaskCard'
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import { tasksAtom } from '../atoms/tasksAtom'

function HomePage() {
  const [selectedTaskId, setSelectedTask] = useState<string | null>(null)
  const [tasks] = useAtom(tasksAtom)

  const selectedTask = useMemo(
    () => tasks.find((task: Task) => task.id === selectedTaskId),
    [selectedTaskId, tasks],
  )

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
      <TasksMap onSelect={setSelectedTask} />
      <Box width="100%">{selectedTask ? <TaskCard task={selectedTask} /> : null}</Box>
    </Box>
  )
}

export default HomePage
