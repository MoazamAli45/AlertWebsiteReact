import { fetchOrders } from '@/features/option-flow/api/queries';
import { optionFlowConfig } from '@/features/option-flow/config';
import { useFlowContext } from '@/features/option-flow/contexts/FlowContext';
import { FlowData } from '@/features/option-flow/types';
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
import { useQuery } from '@tanstack/react-query';

export const PremiumChart = () => {
  const {
    state: { time },
  } = useFlowContext();

  const {
    data = [],
  }: Partial<{
    data: FlowData[];
  }> = useQuery(
    ['orders', time],
    () => fetchOrders({ time: time.toUnixInteger() }),
    { refetchInterval: 5000 },
  );

  const symbols = optionFlowConfig.symbols.reduce(
    (a: Record<string, { calls: number; puts: number }>, v: string) => ({
      ...a,
      [v.toUpperCase()]: { calls: 0, puts: 0 },
    }),
    {},
  );

  const premiumBySymbol = data.reduce((acc, item) => {
    if (item.contract === 'C') {
      acc[item.symbol].calls += item.price * item.size;
    } else {
      acc[item.symbol].puts += item.price * item.size;
    }

    return acc;
  }, symbols);

  const rows = Object.entries(premiumBySymbol)
    .map(([symbol, { calls, puts }]) => {
      return {
        symbol,
        ...(calls > puts
          ? { premium: calls, contract: 'Call' }
          : { premium: puts, contract: 'Put' }),
      };
    })
    .sort((a, b) => b.premium - a.premium)
    .slice(0, 10);
  // .filter((item) => item.premium > 0);

  const maxPremium = rows.length > 0 ? rows[0].premium || 1 : 1;
  const loaded = rows.length > 0 && rows[0].premium > 0;

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
            {loaded
              ? rows.map((row) => (
                  <TableRow
                    key={row.symbol}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: '34px',
                      '& .MuiTableCell-root': {
                        fontWeight: 700,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.symbol}
                    </TableCell>
                    <TableCell align="center">{row.contract}</TableCell>
                    <TableCell align="right">
                      ${row.premium.toLocaleString(undefined)}
                    </TableCell>
                  </TableRow>
                ))
              : optionFlowConfig.symbols.slice(0, 10).map((symbol) => (
                  <TableRow
                    key={symbol}
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
                      <Skeleton
                        height={18}
                        width={48}
                        sx={{ margin: 'auto' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton
                        height={18}
                        width={64}
                        sx={{ float: 'right' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Stack
          sx={{
            position: 'absolute',
            top: '37px',
            left: 0,
            width: '100%',
            zIndex: 1,
          }}
        >
          {rows.map((row, index) => (
            <Box
              key={row.symbol}
              sx={{
                height: '34px',
                width: `${(row.premium * 100) / maxPremium}%`,
                transition: 'width 0.5s',
                bgcolor: 'rgb(64, 181, 173)',
                opacity: `${
                  row.premium / maxPremium -
                  (rows.length - index) * 0.01 +
                  index * 0.01
                }`,
              }}
            ></Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};
