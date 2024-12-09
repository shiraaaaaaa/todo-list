import { useState } from 'react'
import TaskDialog from '../components/TaskDialog'
import { Box, Button, TextField } from '@mui/material'
import { Task } from '../types/task'
import TaskCard from '../components/TaskCard';

function TasksList() {
  const [open, setOpen] = useState(false)
  const tasksInit: Task[] = [
    {
      id: '1',
      description: 'Do homework',
      priority: 1,
      subjects: ['math', 'english', "school", "chore", "homework"],
      dueDate: new Date(),
      isDone: false
    },
    {
      id: '2',
      description: 'Buy groceries',
      priority: 2,
      subjects: ['shopping'],
      dueDate: new Date(),
      isDone: false
    }
  ]
  const [tasks, setTasks] = useState<Task[]>(tasksInit)

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button variant='contained' onClick={() => setOpen(true)}>add task</Button>
        <TextField placeholder='search...'></TextField>
      </Box>
      <Box display='flex' flexDirection="column" gap="10px">
        {tasks.map((task, index) => (
          <TaskCard task={task} setOpen={setOpen} key={index} setTasks={setTasks} />
        ))
        }
      </Box>
      <TaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default TasksList
