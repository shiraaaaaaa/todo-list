import { useState } from 'react'

import { Button } from '@mui/material'

import TaskDialog from '../components/TaskDialog/TaskDialog'
import TasksTable from '../components/ManagerPage/TasksTable'

function ManagerPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
        add task
      </Button>
      <TaskDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <TasksTable />
    </>
  )
}

export default ManagerPage
