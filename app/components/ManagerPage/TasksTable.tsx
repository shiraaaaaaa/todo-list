import { useState } from 'react'

import { Button } from '@mui/material'

import { createColumnHelper, Row } from '@tanstack/react-table'

import useTasks from '../../hooks/tasks/useTasks'
import useDeleteTask from '../../hooks/tasks/useDeleteTask'

import { Task } from '../../types/task'

import TaskDialog from '../TaskDialog'
import TableLayout from '../TableLayout'

const TableActions = ({ task }: { task: Task }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <>
      <TaskDialog task={task} open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <Button onClick={() => setIsDialogOpen(true)}>edit</Button>
      <Button color="error" onClick={() => deleteTask(task._id)}>
        delete
      </Button>
    </>
  )
}

const TasksTable = () => {
  const { data: tasks, status, error } = useTasks([])
  const columnHelper = createColumnHelper<Task>()

  const columns = [
    columnHelper.accessor('_id', {}),
    columnHelper.accessor('description', {
      header: () => 'Description',
    }),
    columnHelper.accessor('priority', {
      header: () => 'Priority',
    }),
    columnHelper.accessor('subjects', {
      cell: (info) => info.getValue().join(', '),
      header: () => 'Subjects',
      filterFn: (row: Row<Task>, id, filterValue) =>
        (row.getValue(id) as string[]).some((subject) => subject.includes(filterValue)),
    }),
    columnHelper.accessor('dueDate', {
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      header: () => 'Due date',
      enableColumnFilter: false,
    }),
    columnHelper.accessor((task) => task, {
      id: 'actions',
      cell: (value) => <TableActions task={value.getValue()} />,
      header: () => 'Actions',
      enableColumnFilter: false,
      enableSorting: false,
    }),
  ]

  if (status === 'pending') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>
  }

  return <TableLayout data={tasks} columns={columns} />
}

export default TasksTable
