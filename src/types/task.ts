export type Task = {
    id: string,
    description: string,
    priority: number,
    subjects: string[],
    dueDate: Date,
    isDone: boolean
}