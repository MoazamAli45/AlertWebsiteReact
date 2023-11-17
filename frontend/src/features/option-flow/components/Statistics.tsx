import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Title } from 'chart.js';
import { Stack, Paper, Typography, Box, Skeleton } from '@mui/material';

import { Order } from '@/features/option-flow/types';
import { useAppSelector } from '@/store/hooks';
import { cleanOrders } from '@/utils/cleanOrders';

Chart.register(ArcElement, Legend, Title);

const ChartCard = ({ title, value }: { title?: string; value: number }) => {
  // const { isLoading } = useFetchOrdersQuery();
  const isLoading = useAppSelector((state) => state.order.isLoading);
  if (isLoading) {
    return (
      <Stack
        direction="row"
        sx={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        gap={3}
      >
        <Stack gap={1.25}>
          <Skeleton width={100} />
          <Skeleton width={80} />
        </Stack>
        <Box
          sx={{
            height: '100%',
            '&:hover': {
              cursor: 'pointer',
              transform: 'scale(1.05)',
            },
          }}
        >
          <Skeleton variant="circular" width={60} height={60} />
        </Box>
      </Stack>
    );
  }
  return (
    <Stack
      direction="row"
      sx={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      gap={3}
    >
      <Stack gap={1.25}>
        <Typography variant="h6" fontWeight={700} color="text.secondary">
          {title}
        </Typography>
        <Typography fontWeight={500}>{value}</Typography>
      </Stack>
      <Box
        sx={{
          height: '100%',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        {/* <Doughnut {...props} width={60} height={60} /> */}
      </Box>
    </Stack>
  );
};

export const Statistics = () => {
  const { orders } = useAppSelector((state) => state.order);
  console.log(orders, 'statistics');
  const cleanedOrders = cleanOrders(orders);

  // Filter orders based on contract type (PUT or CALL)
  const putOrders = cleanedOrders.filter((order) => order['C/P'] === 'PUT');
  const callOrders = cleanedOrders.filter((order) => order['C/P'] === 'CALL');
  const putValue = putOrders.length;
  const callValue = callOrders.length;
  // Calculate the percentage of PUT and CALL cleanedOrders, rounded to 1 decimal place
  const totalOrders = cleanedOrders.length;
  const putPercentage = ((putValue / totalOrders) * 100).toFixed(1);
  const callPercentage = ((callValue / totalOrders) * 100).toFixed(1);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: '100%',
        '& .MuiPaper-root': {
          py: 1.5,
          px: 2.25,
          maxHeight: '82px',
          width: '100%',
        },
      }}
    >
      <Paper>
        <ChartCard title="Calls flow" value={putValue} />
      </Paper>
      <Paper>
        <ChartCard title="Puts flow" value={callValue} />
      </Paper>
      <Paper>
        <ChartCard title="Calls Premium" value={0} />
      </Paper>
      <Paper>
        <ChartCard title="PUTS PREMIUM" value={0} />
      </Paper>
    </Stack>
  );
};

// function getFilteredData(data: FlowData[], state: FlowState) {
//   const { symbols, expire, premium, contracts, time } = state;

//   const selectedSymbols = Object.entries(symbols)
//     .filter(([, value]) => value)
//     .map(([key, _]) => key);

//   return (
//     data
//       // filter symbols
//       .filter((item) => selectedSymbols.includes(item.symbol))
//       // filter expire
//       .filter((item) => {
//         const expiration = DateTime.fromFormat(item.expiration, 'MMddyy')
//           .set({ hour: 16, minute: 0 })
//           .toUnixInteger();

//         return Interval.fromDateTimes(
//           time.plus({ days: expire.min }),
//           time.plus({ days: expire.max }),
//         ).contains(DateTime.fromMillis(Number(expiration) * 1000));
//       })
//       // filter premium
//       .filter((item) => {
//         const premiumValue = item.price * item.size;

//         const { min, max } = premium;
//         if (max === -1) return true;
//         return premiumValue <= max && premiumValue >= min;
//       })
//       // filter contracts
//       .filter((item) => contracts[item.contract])
//   );
// }
