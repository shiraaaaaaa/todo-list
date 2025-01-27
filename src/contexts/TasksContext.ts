import { createContext } from 'react';
import { Task } from '../types/task';

interface TaskContextData {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TaskContextData>({ tasks: [], setTasks: () => { } });