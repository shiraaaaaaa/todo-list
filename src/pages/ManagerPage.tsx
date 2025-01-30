
import { useState } from 'react';
import TasksTable from '../components/TasksTable';
import TaskDialog from '../components/TaskDialog';
import { Button } from '@mui/material';

function ManagerPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setIsDialogOpen(true)}>add task</Button>
      <TaskDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <TasksTable />
    </>
  )
}

export default ManagerPage
