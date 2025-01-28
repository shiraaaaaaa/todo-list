import { Box, Card, CardContent, IconButton, styled, Typography } from '@mui/material'
import { Task } from '../types/task'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import TaskDialog from './TaskDialog';
import { useAtom } from 'jotai';
import { deleteTaskAtom, updateTaskAtom } from '../atoms/TasksAtom';


const Subject = styled('div')({
    color: 'white',
    fontSize: 10,
    backgroundColor: 'violet',
    padding: 4,
    boxShadow: '0 0 3px rgba(0,0,0,0.2)',
    width: 'fit-content',
    borderRadius: 4,
    margin: "3px 2px"
});

const PriorityCircle = styled('div')({
    borderRadius: '50%',
    width: 20,
    height: 20,
    backgroundColor: 'blueviolet',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    boxShadow: '0 0 3px rgba(0,0,0,0.2)',
})


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
                    <Box display="flex" flexDirection="column" width="500px">
                        <Box display='flex' justifyContent='space-between' alignItems="center">
                            <Box alignItems="center" display="flex" gap="10px">
                                <PriorityCircle>{task.priority}</PriorityCircle>
                                <Typography variant='h5'>{task.description}</Typography>
                            </Box>
                            <Box display='flex'>
                                <IconButton onClick={() => { setIsDialogOpen(true) }} title='edit'>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => { deleteTask(task.id) }} title='delete'>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => { changeIsDone(task) }} title='mark as done'>
                                    <DoneIcon color={task.isDone ? "info" : "inherit"} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant='caption'>{task.dueDate}</Typography>
                        <Box display='flex' justifyContent='flex-start' flexWrap='wrap'>
                            {task.subjects.map((subject, index) => (
                                <Subject key={index}  >
                                    {subject.toLocaleUpperCase()}
                                </Subject>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <TaskDialog task={task} open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>

    )
}

export default TaskCard
