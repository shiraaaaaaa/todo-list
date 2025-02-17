import { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import TaskCard from '../components/TaskCard'
import { SearchTaskContext } from '../contexts/SearchTaskContext'
import useTasks from '../hooks/tasks/useTasks'

function TasksList() {
  const { searchValue } = useContext(SearchTaskContext)

  const tasks = useTasks()

  const filteredTasks =
    searchValue == '' || !tasks.data
      ? tasks.data || []
      : tasks.data.filter((task) =>
          task.description.toLowerCase().includes(searchValue.toLowerCase()),
        )

  if (tasks.isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (tasks.isError) {
    return <Typography>Error: {tasks.error.message}</Typography>
  }

  return (
    <Box>
      {filteredTasks.length === 0 ? (
        <Typography>No Results</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap="10px">
          {filteredTasks.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default TasksList
