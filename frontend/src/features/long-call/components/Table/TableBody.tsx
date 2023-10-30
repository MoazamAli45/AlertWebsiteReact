import { generateTimeColumnHeaders } from '../../utils';
import {
  TableBody as MuiTableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import bs from 'black-scholes';

function round(value: number, precision = 1) {
  const multiplier = Math.pow(10, precision || 0);
  return (Math.round(value * multiplier) / multiplier).toFixed(2);
}

interface TableBodyProps {
  callsData: any;
  chartRange: number;
  stockPrice: number;
  interestRate: number;
  strikePrice: number;
  impliedVolatility: number;
  expirationDate: number;
}

export const TableBody = ({
  callsData,
  chartRange,
  stockPrice,
  interestRate,
  strikePrice,
  impliedVolatility,
  expirationDate,
}: TableBodyProps) => {
  callsData.length = 21;
  const priceRows = getPriceRows(stockPrice, chartRange * 0.01);
  const timeColumns = useMemo(
    () =>
      generateTimeColumnHeaders(
        DateTime.now(),
        DateTime.fromMillis(expirationDate),
      ),
    [expirationDate],
  );

  return (
    <MuiTableBody
      sx={{
        background: `repeating-linear-gradient(to left top,rgb(255, ${
          chartRange || 0.005 * 150
        }, 0), rgb(0, 255, ${chartRange || 0.5 * 204}))`,
      }}
    >
      {priceRows.map((stockPrice, indexRow: number) => [
        <TableRow
          hover
          tabIndex={-1}
          key={`stock-${indexRow}`}
          sx={{
            position: 'absolute',
            left: 8,
            backgroundColor: 'background.default',
            ...(indexRow === 10 && dashedBorder),
          }}
        >
          <TableCell scope="row" sx={{ minWidth: 88, px: 1.5 }}>
            <Typography fontWeight={600} fontSize="0.875rem" component="div">
              ${round(stockPrice, 2)}
            </Typography>
          </TableCell>
        </TableRow>,
        <TableRow
          hover
          tabIndex={-1}
          key={`price-${indexRow}`}
          sx={{ ...(indexRow === 10 && dashedBorder) }}
        >
          {timeColumns?.map((date: DateTime, index: number) => (
            <TableCell key={index}>
              <PriceCell
                stockPrice={stockPrice}
                riskFreeRate={interestRate}
                columnDate={date}
                maturity={expirationDate}
                impliedVolatility={impliedVolatility}
                strike={strikePrice}
                timeColumns={timeColumns}
                index={index}
              />
            </TableCell>
          ))}
        </TableRow>,
      ])}
    </MuiTableBody>
  );
};

const dashedBorder = {
  '& td': {
    borderBottomStyle: 'dashed',
    borderBottomWidth: '1px',
    borderBottomColor: 'grey.300',
  },
};

const getPriceRows = (stockPrice: number, chartRange: number) => {
  const change = (stockPrice * chartRange) / 10;

  const middle = 10,
    length = 21;
  const rowPrices: number[] = [];
  rowPrices[middle] = stockPrice;

  for (let i = middle - 1; i >= 0; i--) {
    rowPrices[i] = rowPrices[i + 1] + change;
  }

  for (let i = middle + 1; i < length; i++) {
    rowPrices[i] = rowPrices[i - 1] - change;
  }

  return rowPrices;
};

interface PriceCellProps {
  stockPrice: number;
  riskFreeRate: number;
  columnDate: DateTime;
  maturity: number;
  impliedVolatility: number;
  strike: number;
  index: number;
  timeColumns: any;
}

const PriceCell = ({
  stockPrice,
  riskFreeRate,
  columnDate,
  maturity,
  impliedVolatility,
  strike,
  index,
  timeColumns,
}: PriceCellProps) => {
  const diff = (maturity - columnDate.toMillis()) / 86400000 / 365;

  if (index == timeColumns.length - 1) {
    return (
      <Typography fontWeight={600} fontSize="0.875rem" component="div">
        {round(Math.max(stockPrice - strike, 0), 2)}
      </Typography>
    );
  } else {
    return (
      <Typography fontWeight={600} fontSize="0.875rem" component="div">
        {round(
          bs.blackScholes(
            stockPrice,
            strike,
            diff,
            impliedVolatility / 100,
            riskFreeRate / 100,
            'call',
          ),
          2,
        )}
      </Typography>
    );
  }
};
