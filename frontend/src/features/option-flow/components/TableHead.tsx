import { TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FlowData } from '../types';

interface TableHeadProps {
  headers: HeaderGroup<FlowData>[];
}

export function TableHead({ headers }: TableHeadProps) {
  return (
    <>
      {headers.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const order = header.column.getIsSorted();

            return (
              <TableCell
                key={header.id}
                align="center"
                colSpan={header.colSpan}
                sx={{ borderWidth: '2px' }}
              >
                <TableSortLabel
                  active={order ? true : false}
                  direction={order || undefined}
                  onClick={header.column.getToggleSortingHandler()}
                  IconComponent={
                    header.column.getCanSort()
                      ? KeyboardArrowDownIcon
                      : undefined
                  }
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    marginRight: '-16px',
                    '& .MuiTableSortLabel-icon': {
                      fontSize: '1.25rem',
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {order ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}
