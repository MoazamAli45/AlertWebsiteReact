import { Chart, ArcElement, Legend, Title } from 'chart.js';
import { Stack, Paper, Typography, Box, Skeleton } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { cleanOrders } from '@/utils/cleanOrders';
import CircularProgress from './CircularProgress';
import { Order } from '../types';
import { convertPremsToNumber } from '@/utils/convertPremsToNumber';
Chart.register(ArcElement, Legend, Title);

const ChartCard = ({
  title,
  value,
  bgcolor,
  percentage,
  showDollarSign = false,
}: {
  title?: string;
  value: number;
  bgcolor?: string;
  percentage?: number;
  showDollarSign?: boolean;
}) => {
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
        <Typography fontWeight={500}>
          {showDollarSign ? `$${value}` : value}
        </Typography>
      </Stack>
      <Box
        sx={{
          height: '100%',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <CircularProgress color={bgcolor} percentage={percentage} />
      </Box>
    </Stack>
  );
};

export const Statistics = () => {
  const { orders } = useAppSelector((state) => state.order);
  // console.log(orders, 'statistics');
  const cleanedOrders = cleanOrders(orders);

  // Filter orders based on contract type (PUT or CALL)
  const putOrders = cleanedOrders.filter((order) => order['C/P'] === 'PUT');
  const callOrders = cleanedOrders.filter((order) => order['C/P'] === 'CALL');
  const putValue = putOrders.length;
  const callValue = callOrders.length;
  // Calculate the percentage of PUT and CALL cleanedOrders, rounded to 1 decimal place
  const totalOrders = cleanedOrders.length;
  const putPercentage = ((putValue / totalOrders) * 100).toFixed(1);
  console.log(typeof +putPercentage, 'putPercentage');
  const callPercentage = ((callValue / totalOrders) * 100).toFixed(1);

  const calculateTotalCostAndPercentage = (
    orders: Order[],
    contractType: string,
  ) => {
    const filteredOrders = orders.filter(
      (order) => order['C/P'] === contractType,
    );
    const totalCost = filteredOrders.reduce((sum, order) => {
      const price = convertPremsToNumber(order['Prems']);
      return sum + price;
    }, 0);

    const totalOrders = cleanedOrders.length;
    const percentage = ((totalCost / totalCostForAllOptions) * 100).toFixed(1);
    const costPerUnit =
      totalOrders > 0 ? (totalCost / totalOrders).toFixed(2) : '0.00';

    return { totalCost, percentage, costPerUnit };
  };

  // Calculate the total cost for all options
  const totalCostForAllOptions = cleanedOrders.reduce((sum, order) => {
    const price = convertPremsToNumber(order['Prems']);
    return sum + price;
  }, 0);

  const putStats = calculateTotalCostAndPercentage(cleanedOrders, 'PUT');
  const callStats = calculateTotalCostAndPercentage(cleanedOrders, 'CALL');

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
        <ChartCard
          title="Calls flow"
          value={putValue}
          bgcolor={'#4E9B47'}
          percentage={+putPercentage}
        />
      </Paper>
      <Paper>
        <ChartCard
          title="Puts flow"
          value={callValue}
          percentage={!orders ? 0 : +callPercentage}
          bgcolor={'#B5210B'}
        />
      </Paper>
      <Paper>
        <ChartCard
          title="Calls Premium"
          value={callStats.totalCost}
          percentage={+callStats.percentage}
          bgcolor={'#4E9B47'}
          showDollarSign={true}
        />
      </Paper>
      <Paper>
        <ChartCard
          title="PUTS PREMIUM"
          value={putStats.totalCost}
          percentage={+putStats.percentage}
          bgcolor={'#B5210B'}
          showDollarSign={true}
        />
      </Paper>
    </Stack>
  );
};
