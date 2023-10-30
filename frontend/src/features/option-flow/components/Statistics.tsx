import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Legend,
  ChartData,
  ChartOptions,
  Title,
} from 'chart.js';
import { Stack, Paper, Typography, Box, Skeleton } from '@mui/material';
import { useFetchOrdersQuery } from '@/features/option-flow/api/queries';
import { useFlowContext } from '@/features/option-flow/contexts/FlowContext';
import { optionFlowConfig } from '../config';
import { palette } from '@/theme/palette';
import { FlowData, FlowState } from '@/features/option-flow/types';
import { DateTime, Interval } from 'luxon';
import { useMemo } from 'react';

Chart.register(ArcElement, Legend, Title);

const ChartCard = ({
  title,
  value,
  ...props
}: {
  title: string;
  value: number | string;
  data: ChartData<'doughnut'>;
  options: ChartOptions<'doughnut'>;
  plugins?: any[];
}) => {
  const { isLoading } = useFetchOrdersQuery();

  if (!props.data.datasets[0].data[0] && isLoading) {
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
          {value.toLocaleString(undefined)}
        </Typography>
      </Stack>
      <Box
        sx={{
          height: '100%',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <Doughnut {...props} width={60} height={60} />
      </Box>
    </Stack>
  );
};

const valueCenter = {
  id: 'valueCenter',
  beforeDraw: function (chart: any) {
    const width = chart.chartArea.width,
      height = chart.chartArea.height,
      ctx = chart.ctx;

    ctx.restore();
    const fontSize = (height / 70).toFixed(2);
    ctx.font = `bold ${fontSize}rem Poppins, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 5;

    const text = `${chart.data.datasets[0].data[0]}%`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2 + chart.legend.height + chart.titleBlock.height;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  cutout: '84%',
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

const CallsPercentage = ({ data }: { data: FlowData[] }) => {
  const callsCount = data.filter(({ contract }) => contract === 'C').length;
  const putsCount = data.filter(({ contract }) => contract === 'P').length;
  const totalCount = callsCount + putsCount;
  const callsPercentage =
    totalCount > 0 ? Number(((callsCount * 100) / totalCount).toFixed(1)) : 0;
  const putsPercentage =
    totalCount > 0 ? Number((100 - callsPercentage).toFixed(1)) : 0;

  const chartData: ChartData<'doughnut'> = {
    labels: ['Call', 'Put'],
    datasets: [
      {
        data: [callsPercentage, putsPercentage],
        backgroundColor: [
          optionFlowConfig.contractColor.C,
          palette.background?.default,
        ],
        borderColor: [
          optionFlowConfig.contractColor.C,
          palette.background?.default,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartCard
      title="Calls Flow"
      value={callsCount}
      data={chartData}
      options={chartOptions}
      plugins={[valueCenter]}
    />
  );
};

const PutsPercentage = ({ data }: { data: FlowData[] }) => {
  const callsCount = data.filter(({ contract }) => contract === 'C').length;
  const putsCount = data.filter(({ contract }) => contract === 'P').length;
  const totalCount = callsCount + putsCount;
  const callsPercentage =
    totalCount > 0
      ? Number(((callsCount * 100) / (callsCount + putsCount)).toFixed(1))
      : 0;
  const putsPercentage =
    totalCount > 0 ? Number((100 - callsPercentage).toFixed(1)) : 0;

  const chartData: ChartData<'doughnut'> = {
    labels: ['Put', 'Call'],
    datasets: [
      {
        data: [putsPercentage, callsPercentage],
        backgroundColor: [
          optionFlowConfig.contractColor.P,
          palette.background?.default,
        ],
        borderColor: [
          optionFlowConfig.contractColor.P,
          palette.background?.default,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartCard
      title="Puts Flow"
      value={putsCount}
      data={chartData}
      options={chartOptions}
      plugins={[valueCenter]}
    />
  );
};

const CallsPremium = ({ data }: { data: FlowData[] }) => {
  const premiumByContract = data.reduce(
    (acc, item) => {
      if (item.contract === 'C') {
        acc.calls += item.price * item.size;
      } else {
        acc.puts += item.price * item.size;
      }

      return acc;
    },
    { calls: 0, puts: 0 },
  );

  const totalPremium = premiumByContract.calls + premiumByContract.puts;
  const callsPercentage =
    totalPremium > 0
      ? Number(((premiumByContract.calls * 100) / totalPremium).toFixed(1))
      : 0;
  const putsPercentage =
    totalPremium > 0 ? Number((100 - Number(callsPercentage)).toFixed(1)) : 0;

  const chartData: ChartData<'doughnut'> = {
    labels: ['Call', 'Put'],
    datasets: [
      {
        data: [callsPercentage, putsPercentage],
        backgroundColor: [
          optionFlowConfig.contractColor.C,
          palette.background?.default,
        ],
        borderColor: [
          optionFlowConfig.contractColor.C,
          palette.background?.default,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartCard
      title="Calls Premium"
      value={`$${premiumByContract.calls.toLocaleString(undefined)}`}
      data={chartData}
      options={chartOptions}
      plugins={[valueCenter]}
    />
  );
};

const PutsPremium = ({ data }: { data: FlowData[] }) => {
  const premiumByContract = data.reduce(
    (acc, item) => {
      if (item.contract === 'C') {
        acc.calls += item.price * item.size;
      } else {
        acc.puts += item.price * item.size;
      }

      return acc;
    },
    { calls: 0, puts: 0 },
  );

  const totalPremium = premiumByContract.calls + premiumByContract.puts;
  const callsPercentage =
    totalPremium > 0
      ? Number(((premiumByContract.calls * 100) / totalPremium).toFixed(1))
      : 0;
  const putsPercentage =
    totalPremium > 0 ? Number((100 - callsPercentage).toFixed(1)) : 0;

  const chartData: ChartData<'doughnut'> = {
    labels: ['Call', 'Put'],
    datasets: [
      {
        data: [putsPercentage, callsPercentage],
        backgroundColor: [
          optionFlowConfig.contractColor.P,
          palette.background?.default,
        ],
        borderColor: [
          optionFlowConfig.contractColor.P,
          palette.background?.default,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartCard
      title="Puts Premium"
      value={`$${premiumByContract.puts.toLocaleString(undefined)}`}
      data={chartData}
      options={chartOptions}
      plugins={[valueCenter]}
    />
  );
};

export const Statistics = () => {
  const { state } = useFlowContext();

  const { data = [] } = useFetchOrdersQuery();

  const filteredData = useMemo(
    () => getFilteredData(data, state),
    [data, state],
  );

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
        <CallsPercentage data={filteredData} />
      </Paper>
      <Paper>
        <PutsPercentage data={filteredData} />
      </Paper>
      <Paper>
        <CallsPremium data={filteredData} />
      </Paper>
      <Paper>
        <PutsPremium data={filteredData} />
      </Paper>
    </Stack>
  );
};

function getFilteredData(data: FlowData[], state: FlowState) {
  const { symbols, expire, premium, contracts, time } = state;

  const selectedSymbols = Object.entries(symbols)
    .filter(([, value]) => value)
    .map(([key, _]) => key);

  return (
    data
      // filter symbols
      .filter((item) => selectedSymbols.includes(item.symbol))
      // filter expire
      .filter((item) => {
        const expiration = DateTime.fromFormat(item.expiration, 'MMddyy')
          .set({ hour: 16, minute: 0 })
          .toUnixInteger();

        return Interval.fromDateTimes(
          time.plus({ days: expire.min }),
          time.plus({ days: expire.max }),
        ).contains(DateTime.fromMillis(Number(expiration) * 1000));
      })
      // filter premium
      .filter((item) => {
        const premiumValue = item.price * item.size;

        const { min, max } = premium;
        if (max === -1) return true;
        return premiumValue <= max && premiumValue >= min;
      })
      // filter contracts
      .filter((item) => contracts[item.contract])
  );
}
