import { useState } from 'react'
import TaskDialog from '../components/TaskDialog'
import { Box, Button } from '@mui/material'
import TasksList from '../components/TasksList'
import SearchTasksInput from '../components/SearchTasksInput'
import SearchTaskProvider from '../providers/SearchTaskProviders'

function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <SearchTaskProvider>
      <Box marginX="10%">
        <Box display="flex" justifyContent="center" gap={3}>
          <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
            add task
          </Button>
          <SearchTasksInput />
        </Box>
        <TasksList />
        <TaskDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </Box>
    </SearchTaskProvider>
  )
}

export default TasksPage
