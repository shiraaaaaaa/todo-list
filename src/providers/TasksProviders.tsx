import { useState } from 'react';
import { Task } from '../types/task';
import { TasksContext } from '../contexts/TasksContext';
import initialTasks from '../data/initialTasks';



export default function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
