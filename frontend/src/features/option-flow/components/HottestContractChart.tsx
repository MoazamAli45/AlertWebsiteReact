import { useAppSelector } from '@/store/hooks';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Skeleton,
} from '@mui/material';
import { cleanOrders } from '@/utils/cleanOrders';
import { convertPremsToNumber } from '@/utils/convertPremsToNumber';

function formatDate(inputDate: string): string {
  // Create a Date object from the input string
  const dateObject = new Date(inputDate);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  // Use Intl.DateTimeFormat to format the date
  const formattedDate: string = new Intl.DateTimeFormat(
    'en-US',
    options,
  ).format(dateObject);

  return formattedDate;
}

export const HottestPurcahseChart = () => {
  const { isLoading, orders, error } = useAppSelector((state) => state.order);
  console.log(error);
  // console.log(orders, 'statistics');
  const cleanedOrders = cleanOrders(orders);
  const ordersWithNumericPrems = cleanedOrders.map((order, index) => ({
    ...order,
    numericPrems: convertPremsToNumber(order['Prems']),
    id: index + 1,
  }));
  // Sorting the array based on both 'numericPrems' and 'Strike' in descending order
  const sortedOrders = ordersWithNumericPrems.sort((a, b) => {
    // Compare the sum of 'numericPrems' and 'Strike' in descending order
    const aValue = +b.numericPrems + +b.Strike;
    const bValue = +a.numericPrems + +a.Strike;

    return +aValue - +bValue;
  });
  // Now, sortedOrders contains the array sorted based on both 'numericPrems' and 'Strike'
  console.log(sortedOrders);
  return (
    <Paper
      sx={{
        p: 2,
        height: 'fit-content',
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: 700, color: 'text.secondary', ml: 1.5 }}
      >
        Hottest Contract
      </Typography>
      <Box
        sx={{
          position: 'relative',
          overflowY: 'auto',
          mt: 1,
          overflowX: 'hidden',
          maxHeight: 400,
        }}
      >
        <Table
          sx={{
            minWidth: 320,
            zIndex: 2,
            position: 'relative',
          }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>Option Details</TableCell>
              <TableCell align="center"># of Contracts Traded </TableCell>
              <TableCell align="right">Total Premium Combined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                <TableRow
                  key={i}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    height: '34px',
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 700 }}
                  >
                    <Skeleton height={18} width={64} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton height={18} width={48} sx={{ margin: 'auto' }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton height={18} width={64} sx={{ float: 'right' }} />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              sortedOrders &&
              sortedOrders.slice(0, 10).map((order, i) => (
                <>
                  <TableRow
                    key={i}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: '34px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      //  I want to take it more width then others

                      sx={{ fontWeight: 700 }}
                    >
                      {order['Symbol']} - ${order['Strike'].slice(0, -3)}{' '}
                      {order['C/P']} ,{formatDate(order['Exp Date'])}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      {order['Size']}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      ${order['numericPrems'].toLocaleString()}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};
