import { TableRow, TableCell, Typography } from '@mui/material';
import {
  generateDaysColumnHeaders,
  generateMonthsColumnHeaders,
  generateTimeColumnHeaders,
} from '../../utils';
import { useMemo } from 'react';
import { DateTime } from 'luxon';

interface TableHeadProps {
  expirationDate: number;
  daysToExpiration: number;
}

export function TableHead({
  expirationDate,
  daysToExpiration,
}: TableHeadProps) {
  const timeColumns = useMemo(
    () =>
      generateTimeColumnHeaders(
        DateTime.now(),
        DateTime.fromMillis(expirationDate),
      ),
    [expirationDate],
  );
  const dayColumns = generateDaysColumnHeaders(timeColumns);
  const monthColumns = generateMonthsColumnHeaders(timeColumns);

  return (
    <>
      <TableRow>
        {monthColumns.map(({ month, colSpan }, index: number) => (
          <TableCell align="center" colSpan={colSpan} key={index}>
            {month.setZone('system').toLocaleString({
              month: 'short',
            })}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {dayColumns.map(({ day, colSpan }) => (
          <TableCell align="center" key={day.toMillis()} colSpan={colSpan}>
            {day.setZone('system').toLocaleString({
              day: '2-digit',
              weekday: 'narrow',
            })}
          </TableCell>
        ))}
      </TableRow>
      {daysToExpiration < 18 && (
        <TableRow>
          {timeColumns.map((date: DateTime) => (
            <TableCell align="center" key={date.toMillis()} colSpan={1}>
              <Typography variant="caption">
                {date.setZone('system').toLocaleString(DateTime.TIME_SIMPLE)}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
}
