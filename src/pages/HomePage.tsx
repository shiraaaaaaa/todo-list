
import { useState } from 'react';
import TasksMap from '../components/TasksMap';
import { Task } from '../types/task';
import TaskCard from '../components/TaskCard';
import { Box } from '@mui/material';

function HomePage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)


  return (
    <>
      <Box display="flex"
        flexDirection="column" justifyContent="center" alignItems="center"
        height="80vh" width="80%" gap="20px" margin="auto">
        <TasksMap onSelect={setSelectedTask} selectedTask={selectedTask} />
        <Box width="100%">
          {selectedTask ? (<TaskCard task={selectedTask} />) : null}
        </Box>
      </Box>
    </>
  )
}

export default HomePage
