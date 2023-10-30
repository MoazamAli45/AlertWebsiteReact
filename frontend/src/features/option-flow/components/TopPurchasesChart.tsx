import {
  fetchOptions,
  useFetchOrdersQuery,
} from '@/features/option-flow/api/queries';
import { FlowData } from '@/features/option-flow/types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Typography,
  Box,
  TableContainer,
  Skeleton,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

type Row = {
  contract: string;
  change: string;
  price: number;
  lastPrice: number;
  symbol: string;
  expirationDate: string;
  strike: string;
  key: string;
};

export const TopPurchasesChart = () => {
  const { data: orders = [], isFetched } = useFetchOrdersQuery();

  const symbolStrikeKeys = getSymbolStrikeKeys(orders);

  const { data: options } = useQuery(
    ['options'],
    () => fetchOptions(symbolStrikeKeys),
    {
      refetchInterval: 120000,
      enabled: isFetched,
    },
  );

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (options) {
      setRows(getRows(orders, options));
    }
  }, [orders, options]);

  return (
    <Paper
      sx={{
        p: 2,
        overflow: 'hidden',
        display: 'flex',
        minHeight: 250,
        maxHeight: 'fit-content',
      }}
    >
      <Box sx={{ overflow: 'hidden', pb: 4 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, color: 'text.secondary', ml: 1.5 }}
        >
          Top Purchases
        </Typography>
        <TableContainer sx={{ mt: 1, height: '100%', overflowX: 'hidden' }}>
          <Table
            sx={{
              minWidth: 300,
              height: '100%',
            }}
            aria-label="Top Purchases"
            size="small"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Contract</TableCell>
                <TableCell align="center">Purchase Price</TableCell>
                <TableCell align="right">Percent Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0
                ? rows
                    .sort((a, b) => Number(b.change) - Number(a.change))
                    .slice(0, 10)
                    .map((row) => (
                      <TableRow
                        key={row.key}
                        sx={{
                          '& .MuiTableCell-root': {
                            fontWeight: 600,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.symbol} {row.strike}{' '}
                          <Typography
                            component="span"
                            sx={{
                              textTransform: 'capitalize',
                              fontWeight: 'inherit',
                            }}
                          >
                            {row.contract}
                          </Typography>
                          , {row.expirationDate}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${row.change}%`}
                            sx={{
                              bgcolor: 'rgba(64, 181, 173, 0.7)',
                              height: 24,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                : [...new Array(10)].map((key) => (
                    <TableRow
                      key={key}
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
        </TableContainer>
      </Box>
    </Paper>
  );
};

function getRows(orders: FlowData[], options: any) {
  return orders
    .map((order: FlowData) => {
      const symbolStrikeKey = `${order.symbol}:${order.strike}`;

      const contract = order.contract === 'C' ? 'call' : 'put';

      const option = options[symbolStrikeKey]?.[order.key];

      if (!option) return undefined;

      const price = order.price / 100;
      const newPrice = option.last;
      const change = (((newPrice - price) / price) * 100).toFixed(2);

      return {
        contract,
        change,
        price,
        lastPrice: option?.last,
        symbol: order.symbol,
        expirationDate: DateTime.fromFormat(order.expiration, 'MMddyy')
          .startOf('day')
          .toFormat('DD'),
        strike: order.strike,
        key: (Date.now() * Math.random()).toString(36),
      } as any;
    })
    .filter(Boolean)
    .filter((row) => Number(row.change) > 0);
}

function getSymbolStrikeKeys(orders: FlowData[]) {
  return Object.keys(
    orders.reduce(
      (acc, { symbol, strike }) => ({ ...acc, [`${symbol}:${strike}`]: true }),
      {},
    ),
  );
}
