import { useAppSelector } from '@/store/hooks';
import {
  Stack,
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
export const PremiumChart = () => {
  const { isLoading, orders, error } = useAppSelector((state) => state.order);
  console.log(error);
  // console.log(orders, 'statistics');
  const cleanedOrders = cleanOrders(orders);
  const ordersWithNumericPrems = cleanedOrders.map((order, index) => ({
    ...order,
    numericPrems: convertPremsToNumber(order['Prems']),
    id: index + 1,
  }));
  // Sort orders based on numericPrems in descending order
  const sortedOrders = ordersWithNumericPrems.sort(
    (a, b) => b.numericPrems - a.numericPrems,
  );
  // Find the maximum numericPrems value
  const maxNumericPrems = sortedOrders && sortedOrders[0]?.numericPrems;

  const premiumOrders =
    maxNumericPrems &&
    sortedOrders.map((order) => ({
      ...order,
      percent: ((order.numericPrems / maxNumericPrems) * 100).toFixed(0),
      width: `w-[${((order.numericPrems / maxNumericPrems) * 100).toFixed(
        0,
      )}%]`,
    }));
  console.log(premiumOrders);
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
        Top Gainers
      </Typography>
      <Box
        sx={{
          position: 'relative',
          overflowY: 'auto',
          mt: 1,
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
              <TableCell>Symbol</TableCell>
              <TableCell align="center">Contract</TableCell>
              <TableCell align="right">Premium</TableCell>
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
            {premiumOrders &&
              premiumOrders.slice(0, 10).map((order, i) => (
                <>
                  <TableRow
                    key={i}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: '34px',
                      position: 'relative',
                      zIndex: 1,
                      backgroundColor: `${
                        order.percent === '100' ? `#40B5AD` : `transparent`
                      }`,
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 700 }}
                    >
                      {order['Symbol']}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      {order['C/P']}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      ${order['numericPrems'].toLocaleString()}
                    </TableCell>
                    <div
                      className={`${order.width} h-full absolute top-0 left-0 bg-[#40B5AD] bg-opacity-20 z-0`}
                      style={{
                        width: `${order.percent}%`,
                      }}
                    ></div>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};
