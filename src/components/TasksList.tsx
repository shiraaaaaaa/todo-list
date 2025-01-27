import { useContext, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import TaskCard from '../components/TaskCard';
import { TasksContext } from '../contexts/TasksContext';
import { SearchTaskContext } from '../contexts/SearchTaskContext';
import { Task } from '../types/task';

function TasksList() {
    const { tasks } = useContext(TasksContext);
    const { searchValue } = useContext(SearchTaskContext);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useMemo(() => {
        setFilteredTasks(searchValue == ""
            ? tasks
            : tasks.filter(task => task.description.toLowerCase().includes(searchValue.toLowerCase())));
    }, [tasks, searchValue]);

    return (
        <Box display='flex' flexDirection="column" gap="10px">
            {filteredTasks.map((task, index) => (
                <TaskCard task={task} key={index} />
            ))}
        </Box>
    )
}

export default TasksList
