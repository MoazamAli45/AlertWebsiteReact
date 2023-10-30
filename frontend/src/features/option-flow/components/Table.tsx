import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import MuiTableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { DateTime, Interval } from 'luxon';
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { fetchOrders, useOpenInterest } from '../api/queries';
import { FlowData } from '../types';
import { TableHead } from './TableHead';
import { useFlowContext } from '../contexts/FlowContext';
import { ContractTag, ExecutionTag, PremiumTag } from './Tag';
import { optionFlowConfig } from '../config';
import {
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const getCellValue = (row: Row<FlowData>, columnId: string) => {
  return row?.getValue(columnId);
};

const getRowGradient = (row: Row<FlowData>) => {
  const premium = getCellValue(row, 'premium') as number;

  let color;
  optionFlowConfig.premiumColorBreakpoints.forEach((b, i) => {
    if (premium >= b) color = optionFlowConfig.premiumColors[i].bg;
  });

  return `linear-gradient(45deg, transparent 10%, ${color} 50%, transparent 90%)`;
};

type ItemProps = {
  icon: React.ReactElement;
  key: keyof FlowData;
  title: string;
  prefix?: string;
};

const detailsItems: ItemProps[] = [
  {
    icon: <MonetizationOnIcon />,
    key: 'askPrice',
    title: 'Ask price',
    prefix: '$',
  },
  {
    icon: <MonetizationOnIcon />,
    key: 'bidPrice',
    title: 'Bid price',
    prefix: '$',
  },
  {
    icon: <ShowChartIcon />,
    key: 'underlyingPrice',
    title: 'Underlying price',
    prefix: '$',
  },
  {
    icon: <GraphicEqIcon />,
    key: 'volume',
    title: 'Volume',
  },
];

const DetailsItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactElement;
  title: string;
  value: string;
}) => {
  return (
    <ListItem>
      <ListItemAvatar>{icon}</ListItemAvatar>
      <ListItemText secondary={title} primary={value} />
    </ListItem>
  );
};

const CustomDetailsItem = ({ symbol, strike, ...details }: FlowData) => {
  const { data } = useOpenInterest({ symbol, strike });

  if (!data)
    return (
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <Stack></Stack>
        <ListItemText
          secondary={
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={105} />
          }
          primary={
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} />
          }
        />
      </ListItem>
    );

  const now = DateTime.now().startOf('day');
  const expirationDate = DateTime.fromFormat(
    details.expiration,
    'MMddyy',
  ).startOf('day');

  const days = expirationDate.diff(now, 'days').days;

  const expDateKey = `${expirationDate.toFormat('yyyy-MM-dd')}:${days}`;

  const contract = details.contract === 'C' ? 'call' : 'put';
  const expDateMap = data[`${contract}ExpDateMap`];

  const strikeFloat = Number(strike)?.toFixed(1);

  const value = expDateMap[expDateKey]?.[strikeFloat]?.[0]?.openInterest;

  return (
    <DetailsItem
      icon={<EqualizerIcon />}
      title="Open interest"
      value={days < 0 ? 'Expired' : value?.toLocaleString()}
    />
  );
};

const RowDetails = ({
  details,
  isCollapsed,
  animationDelay,
}: {
  details: FlowData;
  isCollapsed: boolean;
  animationDelay: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(isCollapsed);

  useEffect(() => {
    setIsExpanded(!isCollapsed);
  }, [isCollapsed]);

  return (
    <TableRow>
      <TableCell
        colSpan={100}
        sx={{
          padding: 0,
          '& .MuiCollapse-wrapper': {
            padding: '6px 16px',
          },
        }}
      >
        <Collapse in={isExpanded} timeout={animationDelay}>
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-around"
            alignItems="center"
          >
            {detailsItems.map(({ icon, title, key, prefix }) => (
              <DetailsItem
                key={title}
                icon={icon}
                title={title}
                value={`${prefix ? prefix : ''}${details[
                  key
                ]?.toLocaleString()}`}
              />
            ))}
            <CustomDetailsItem {...details} />
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

const VirtuosoTableComponents: TableComponents<Row<FlowData>> = {
  Scroller: React.forwardRef<HTMLDivElement>(function scroller(props, ref) {
    return (
      <TableContainer
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        {...props}
        ref={ref}
      />
    );
  }),
  Table: (props) => (
    <MuiTable
      sx={{ minWidth: 950, width: '100%' }}
      aria-labelledby="tableTitle"
      size="small"
      stickyHeader
      {...props}
    />
  ),
  TableHead: MuiTableHead,
  TableRow: ({ item, ...props }: { item: Row<FlowData> }) => {
    const ANIMATION_DELAY = 300;
    const details = item.original;
    const [isCollapsed, setIsCollapsed] = useState(!item.getIsExpanded());

    const handleToggleMoreInfo = () => {
      if (isCollapsed) {
        item.toggleExpanded(!item.getIsExpanded());
      } else {
        setTimeout(
          () => item.toggleExpanded(!item.getIsExpanded()),
          ANIMATION_DELAY,
        );
      }
      setIsCollapsed((isCollapsed) => !isCollapsed);
    };

    return (
      <>
        <TableRow
          hover
          tabIndex={-1}
          key={item.id}
          sx={{ background: getRowGradient(item), cursor: 'pointer' }}
          onClick={handleToggleMoreInfo}
          {...props}
        />
        {item.getIsExpanded() && (
          <RowDetails
            details={details}
            isCollapsed={isCollapsed}
            animationDelay={ANIMATION_DELAY}
          />
        )}
      </>
    );
  },
  TableBody: React.forwardRef<HTMLTableSectionElement>(function tableBody(
    props,
    ref,
  ) {
    return <TableBody {...props} ref={ref} />;
  }),
};

function rowContent(_index: number, row: Row<FlowData>) {
  return row.getVisibleCells().map((cell, index) => {
    return index === 0 ? (
      <TableCell scope="row" padding="none" align="center" key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    ) : (
      <TableCell align="center" key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  });
}

export function Table() {
  const [sorting, setSorting] = useState([{ id: 'timestamp', desc: false }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { state, dispatch } = useFlowContext();
  const { time } = state;

  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery(
    ['orders', time],
    () => fetchOrders({ time: time.toUnixInteger() }),
    { refetchInterval: 5000 },
  );

  useEffect(
    () => dispatch({ type: 'setIsFetching', value: isFetching }),
    [isFetching, dispatch],
  );

  const columnHelper = createColumnHelper<FlowData>();

  const columns = useMemo<ColumnDef<FlowData, any>[]>(
    () => [
      columnHelper.accessor('timestamp', {
        header: 'Time',
        cell: (t) =>
          DateTime.fromMillis(t.getValue() * 1000).toLocaleString(
            DateTime.TIME_WITH_SECONDS,
          ),
      }),
      columnHelper.accessor('symbol', {
        header: 'Ticker',
        filterFn: (row, id, filterValue) =>
          filterValue[row.getValue(id) as string],
      }),
      columnHelper.accessor(
        (r) =>
          DateTime.fromFormat(r.expiration, 'MMddyy')
            .set({ hour: 9, minute: 30 })
            .toUnixInteger(),
        {
          id: 'expiration',
          header: 'Expiration',
          cell: (t) =>
            DateTime.fromMillis(t.getValue() * 1000)
              .setLocale('en-US')
              .toLocaleString(DateTime.DATE_MED),
          filterFn: (row, id, filterValue) =>
            Interval.fromDateTimes(
              time.plus({ days: filterValue.min }),
              time.plus({ days: filterValue.max }),
            ).contains(DateTime.fromMillis(Number(row.getValue(id)) * 1000)),
        },
      ),
      columnHelper.accessor('strike', {
        header: 'Strike Price',
        cell: (t) => '$' + t.getValue(),
      }),
      columnHelper.accessor('contract', {
        header: 'Contract',
        cell: (t) => <ContractTag value={t.getValue()} />,
        filterFn: (row, id, filterValue) => {
          return filterValue[row.getValue(id) as string];
        },
      }),
      columnHelper.accessor('price', {
        header: 'Size @ Price',
        cell: (t) =>
          t.row.original.size + ' @ $' + (t.getValue() / 100).toFixed(2),
      }),
      columnHelper.accessor((r) => r.price * r.size, {
        id: 'premium',
        header: 'Premium',
        cell: (t) => {
          return (
            <PremiumTag
              value={t.getValue()}
              contract={t.row.original.contract}
            />
          );
        },
        filterFn: (row, id, filterValue) => {
          const { min, max } = filterValue;
          if (max === -1) return true;
          const premium = row.getValue(id) as number;
          return premium <= max && premium >= min;
        },
      }),
      columnHelper.accessor('execution', {
        header: 'Execution',
        cell: (t) => {
          const price = t.row.original.price / 100;
          const bidPrice = t.row.original.bidPrice;
          const askPrice = t.row.original.askPrice;

          let value: string;

          if (price === askPrice) {
            value = 'ASK';
          } else if (price === bidPrice) {
            value = 'BID';
          } else if (price > askPrice) {
            value = 'ABOVE ASK';
          } else if (price < bidPrice) {
            value = 'BELOW BID';
          } else {
            value = 'MID';
          }

          return <ExecutionTag value={value} />;
        },
      }),
      columnHelper.accessor('dte', {
        header: 'DTE',
        cell: (t) => {
          const currentDate = DateTime.now();
          const expirationDate = DateTime.fromFormat(
            t.row.original.expiration,
            'MMddyy',
          ).set({ hour: 16 });

          const diff = expirationDate.diff(currentDate, 'days').days;
          return diff.toFixed(2);
        },
      }),
    ],
    [columnHelper, time],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableFilters: true,
    enableColumnFilters: true,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    table.getColumn('symbol')?.setFilterValue(state.symbols);
    table.getColumn('contract')?.setFilterValue(state.contracts);
    table.getColumn('premium')?.setFilterValue(state.premium);
    table.getColumn('expiration')?.setFilterValue(state.expire);
  }, [table, state]);

  const { rows } = table.getRowModel();

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
        flexGrow: 1,
        minHeight: 150,
      }}
    >
      {rows.length > 0 ? (
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => (
            <TableHead headers={table.getHeaderGroups()} />
          )}
          itemContent={rowContent}
        />
      ) : (
        <TableContainer
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <MuiTable
            sx={{ minWidth: 950, width: '100%' }}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
          >
            <MuiTableHead>
              <TableHead headers={table.getHeaderGroups()} />
            </MuiTableHead>
          </MuiTable>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '1 1 100%',
            }}
          >
            {rows.length === 0 &&
              (isLoading ? (
                <CircularProgress />
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  No data
                </Typography>
              ))}
          </Box>
        </TableContainer>
      )}
    </Paper>
  );
}
