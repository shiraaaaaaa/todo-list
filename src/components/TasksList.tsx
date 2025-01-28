import { useContext, useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import TaskCard from '../components/TaskCard';
import { SearchTaskContext } from '../contexts/SearchTaskContext';
import { Task } from '../types/task';
import { useAtom } from 'jotai';
import { tasksAtom } from '../atoms/TasksAtom';

function TasksList() {
    const [tasks] = useAtom(tasksAtom);
    const { searchValue } = useContext(SearchTaskContext);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useMemo(() => {
        setFilteredTasks(searchValue == ""
            ? tasks
            : tasks.filter(task => task.description.toLowerCase().includes(searchValue.toLowerCase())));
    }, [tasks, searchValue]);

    return (
        <Box >
            {filteredTasks.length === 0 ? <Typography>No Results</Typography> :
                <Box display='flex' flexDirection="column" gap="10px">
                    {filteredTasks.map((task, index) => (
                        <TaskCard task={task} key={index} />
                    ))}
                </Box>}
        </Box>
    )
}

export default TasksList
