import {
  Box,
  Card,
  CardContent,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import { Task } from '../types/task'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import { useState } from 'react'
import TaskDialog from './TaskDialog'
import { useAtom } from 'jotai'
import { deleteTaskAtom, updateTaskAtom } from '../atoms/tasksAtom'

const SubjectButton = styled('div')(({ theme }) => ({
  color: 'white',
  fontSize: 10,
  backgroundColor: theme.palette.secondary.main,
  padding: 4,
  boxShadow: '0 0 3px rgba(0,0,0,0.2)',
  borderRadius: 4,
  margin: '3px 2px',
}))

const PriorityCircle = styled('div')(({ theme }) => ({
  borderRadius: '50%',
  width: 20,
  height: 20,
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
  boxShadow: '0 0 3px rgba(0,0,0,0.2)',
}))

function TaskCard({ task }: { task: Task }) {
  const [, updateTask] = useAtom(updateTaskAtom)
  const [, deleteTask] = useAtom(deleteTaskAtom)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const changeIsDone = (task: Task) => {
    updateTask(task.id, { isDone: !task.isDone })
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            height="max-content"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box alignItems="center" display="flex" gap="10px">
                <PriorityCircle>{task.priority}</PriorityCircle>
                <Typography variant="h5">{task.description}</Typography>
              </Box>
              <Box display="flex">
                <IconButton
                  onClick={() => {
                    setIsDialogOpen(true)
                  }}
                  title="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteTask(task.id)
                  }}
                  title="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    changeIsDone(task)
                  }}
                  title="mark as done"
                >
                  <DoneIcon color={task.isDone ? 'info' : 'inherit'} />
                </IconButton>
              </Box>
            </Box>
            <Typography>
              duo date- {new Date(task.dueDate).toLocaleString()}
            </Typography>
            <Typography>location- {task.coordinates.toString()}</Typography>
            <Box
              height="max-content"
              display="flex"
              justifyContent="flex-start"
              flexWrap="wrap"
            >
              {task.subjects.map((subject, index) => (
                <SubjectButton key={index}>
                  {subject.toLocaleUpperCase()}
                </SubjectButton>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <TaskDialog
        task={task}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}

export default TaskCard
