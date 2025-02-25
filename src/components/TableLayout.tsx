import { useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography } from '@mui/material'
import { TableSortLabel } from '@mui/material'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import DebouncedInput from './DebounceInput'

const TableLayout = <T,>({ data, columns }: { data: T[]; columns: ColumnDef<T>[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable<T>({
    data,
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Typography>
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        onClick={header.column.getToggleSortingHandler()}
                        active={!!header.column.getIsSorted()}
                        direction={header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'}
                      />
                    ) : null}
                  </Box>
                  {header.column.getCanFilter() ? (
                    <Box maxWidth="max-content">
                      <DebouncedInput
                        onChange={(value) => header.column.setFilterValue(value)}
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

export default TableLayout
