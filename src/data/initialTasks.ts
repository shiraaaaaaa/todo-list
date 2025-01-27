const tasks = [
    {
        id: '1',
        description: 'Do homework',
        priority: 1,
        subjects: ['math', 'english', "school", "chore", "homework"],
        dueDate: new Date().toISOString(),
        isDone: false
    },
    {
        id: '2',
        description: 'Buy groceries',
        priority: 2,
        subjects: ['shopping'],
        dueDate: new Date().toISOString(),
        isDone: false
    },
    {
        id: '3',
        description: 'Create a new task',
        priority: 2,
        subjects: ['react', 'typescript'],
        dueDate: '2022-01-01',
        isDone: false
    }
]

export default tasks