import { useState } from 'react'
import TaskDialog from '../components/TaskDialog'
import { Box, Button } from '@mui/material'
import TasksProvider from '../providers/TasksProviders';
import TasksList from '../components/TasksList';
import SearchTasksInput from '../components/SearchTasks';
import SearchTaskProvider from '../providers/SearchTaskProviders';


function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <SearchTaskProvider>
      <TasksProvider>
        <Box display="flex" justifyContent="space-between">
          <Button variant='contained' onClick={() => setIsDialogOpen(true)}>add task</Button>
          <SearchTasksInput />
        </Box>
        <TasksList />
        <TaskDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </TasksProvider>
    </SearchTaskProvider>
  )
}

export default TasksPage
