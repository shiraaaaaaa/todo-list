import { useState } from 'react'
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Task } from '../types/task'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { deleteTaskAtom, tasksAtom } from '../atoms/tasksAtom'
import { TableSortLabel } from '@mui/material'
import TaskDialog from './TaskDialog'
import DebouncedInput from './DebounceInput'

const TableActions = ({ task }: { task: Task }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [, deleteTask] = useAtom(deleteTaskAtom)

  return (
    <>
      <TaskDialog
        task={task}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Button onClick={() => setIsDialogOpen(true)}>edit</Button>
      <Button color="error" onClick={() => deleteTask(task.id)}>
        delete
      </Button>
    </>
  )
}

const TasksTable = () => {
  const [tasks] = useAtom(tasksAtom)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columnHelper = createColumnHelper<Task>()

  const columns = [
    columnHelper.accessor('id', {}),
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
        (row.getValue(id) as string[]).some((subject) =>
          subject.includes(filterValue),
        ),
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

  const table = useReactTable<Task>({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="row">
                    <Typography>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Typography>
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        onClick={header.column.getToggleSortingHandler()}
                        active={!!header.column.getIsSorted()}
                        direction={
                          header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'
                        }
                      />
                    ) : null}
                  </Box>
                  {header.column.getCanFilter() ? (
                    <Box maxWidth="max-content">
                      <DebouncedInput
                        onChange={(value) =>
                          header.column.setFilterValue(value)
                        }
                        placeholder="Search..."
                        type="text"
                        value={(header.column.getFilterValue() ?? '') as string}
                        size="small"
                      />
                    </Box>
                  ) : null}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TasksTable
