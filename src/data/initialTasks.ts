import { Task } from "../types/task"

const tasks: Task[] = [
    {
        id: '1',
        description: 'Do homework',
        priority: 1,
        subjects: ['math', 'english', "school", "chore", "homework"],
        dueDate: new Date().toISOString(),
        isDone: false,
        coordinates: [35.13184529079918, 31.28811197946996]
    },
    {
        id: '2',
        description: 'Buy groceries',
        priority: 2,
        subjects: ['shopping'],
        dueDate: new Date().toISOString(),
        isDone: false,
        coordinates: [35.13184529079918, 31.28811197946996]
    },
    {
        id: '3',
        description: 'Create a new task',
        priority: 2,
        subjects: ['react', 'typescript'],
        dueDate: '2022-01-01',
        isDone: false,
        coordinates: [34.67675293412006, 31.745551972594384]
    }
]

export default tasks