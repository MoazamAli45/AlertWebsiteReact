import React, { useState, useEffect } from 'react';
import MuiTable from '@mui/material/Table';
import MuiTableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { Chip } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

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

function formatTimeWithAMPM(dateString: string) {
  // Create a Date object from the string
  const dateObject = new Date(dateString);

  // Get hours, minutes, and seconds
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // Determine whether it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds} ${period}`;

  return formattedTime;
}
// Define the interface for the order object
interface Order {
  Symbol: string;
  Time: string;
  'C/P': string;
  Strike: string;
  'Exp Date': string;
  Side: string;
  Size: string;
  Price: string;
  Prems: string;
  DTE: string;
  'Spot Price': string;
  Volume: string;
  'Open Interest': string;
  Trade: string;
  [key: string]: string; // Index signature allowing any
}

interface TableProps {
  orders: Order[];
  onPageChange: (page: number) => void;
}
const colorHead = 'rgba(255,255,255,.7)';

export const Table: React.FC<TableProps> = ({ orders, onPageChange }) => {
  const [pageNo, setPageNo] = useState(1);
  const [sortColumn, setSortColumn] = useState('Time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { isLoading, remainingPages } = useAppSelector((state) => state.order);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    onPageChange(pageNo);
  }, [pageNo, onPageChange, remainingPages]);

  const fetchMoreData = () => {
    if (remainingPages === 0) {
      setHasMore(false);
    } else {
      setPageNo((prev) => prev + 1);
    }
  };

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aValue: any = a[sortColumn];
    let bValue: any = b[sortColumn];

    if (sortColumn === 'Prems') {
      aValue = convertPremsToNumber(aValue);
      bValue = convertPremsToNumber(bValue);
    } else if (sortColumn === 'DTE') {
      aValue = Number(aValue.slice(0, -1));
      bValue = Number(bValue.slice(0, -1));
    }

    if (sortOrder === 'asc') {
      return aValue !== undefined && bValue !== undefined
        ? typeof aValue === 'string'
          ? aValue.localeCompare(bValue)
          : aValue - bValue
        : 0;
    } else {
      return bValue !== undefined && aValue !== undefined
        ? typeof bValue === 'string'
          ? bValue.localeCompare(aValue)
          : bValue - aValue
        : 0;
    }
  });

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',

        flexGrow: 1,
        minHeight: 720,
      }}
    >
      <TableContainer
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {orders.length === 0 && !isLoading && (
          <MuiTable
            sx={{ minWidth: 950, width: '100%' }}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
          >
            <MuiTableHead>
              <TableRow>
                <TableCell>
                  <span className="flex flex-row gap-2 items-center">
                    {' '}
                    Time <MdKeyboardArrowUp color={colorHead} />
                  </span>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Ticker
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Expiration
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Strike Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Contract
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Size @ price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Premium
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Execution
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  DTE
                </TableCell>
              </TableRow>
            </MuiTableHead>

            <TableBody>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                No data
              </Typography>
            </TableBody>
          </MuiTable>
        )}
        {sortedOrders.length === 0 && isLoading && (
          <MuiTable
            sx={{ minWidth: 950, width: '100%' }}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
          >
            <MuiTableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort('Time')}
                  sx={{ cursor: 'pointer' }}
                >
                  <span className="flex flex-row gap-2 items-center">
                    {' '}
                    Time{' '}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex flex-row gap-2 items-center">
                    Ticker
                  </span>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Expiration
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Strike Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Contract
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Size @ price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Premium
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  Execution
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: `${colorHead}`,
                  }}
                >
                  DTE
                </TableCell>
              </TableRow>
            </MuiTableHead>

            <TableBody>
              <CircularProgress />
            </TableBody>
          </MuiTable>
        )}
        {sortedOrders.length !== 0 && (
          <InfiniteScroll
            dataLength={sortedOrders.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p className="text-center">Loading...</p>}
            className="!w-full"
            style={{
              width: '100%',
            }}
          >
            <MuiTable
              sx={{ minWidth: 950, width: '100%' }}
              aria-labelledby="tableTitle"
              size="small"
              stickyHeader
            >
              <MuiTableHead
                sx={{
                  width: '100%',
                }}
              >
                <TableRow>
                  <TableCell
                    onClick={() => handleSort('Time')}
                    sx={{ cursor: 'pointer' }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      {' '}
                      Time{' '}
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>

                  <TableCell
                    onClick={() => handleSort('Symbol')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                    align="right"
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Ticker
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>

                  <TableCell
                    onClick={() => handleSort('Exp Date')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                    align="right"
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Expiration
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>

                  <TableCell
                    onClick={() => handleSort('Strike')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Strike Price
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>

                  <TableCell
                    onClick={() => handleSort('C/P')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Contract
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>

                  <TableCell
                    onClick={() => handleSort('Size')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Size @ Price
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('Prems')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Premium
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('Side')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Execution
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('DTE')}
                    sx={{ cursor: 'pointer', color: `${colorHead}` }}
                  >
                    <span className="flex flex-row gap-2 items-center">
                      DTE
                      {
                        <MdKeyboardArrowUp
                          color={colorHead}
                          style={{
                            transform:
                              sortOrder === 'desc'
                                ? 'rotate(180deg)'
                                : undefined,
                          }}
                        />
                      }
                    </span>
                  </TableCell>
                </TableRow>
              </MuiTableHead>

              <TableBody
                sx={{
                  width: '100%',
                }}
              >
                {sortedOrders.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {formatTimeWithAMPM(row.Time)}
                    </TableCell>
                    <TableCell align="right">{row.Symbol}</TableCell>
                    <TableCell align="right">
                      {formatDate(row[`Exp Date`])}
                    </TableCell>
                    <TableCell align="right">${row.Strike}</TableCell>
                    <TableCell align="right">
                      {row[`C/P`] && (
                        <Chip
                          label={row[`C/P`]}
                          variant="outlined"
                          sx={{
                            border: `1px solid ${
                              row[`C/P`] === 'PUT' ? '#F05265' : '#15BA68'
                            }`,
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                            // height: '24px',
                            boxShadow: `0 0 6px 0px ${
                              row[`C/P`] === 'PUT' ? '#F05265' : '#15BA68'
                            };`,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.Size}@ ${row.Price}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: ` ${
                          row[`C/P`] === 'PUT' ? '#F05265' : '#15BA68'
                        }`,
                        fontWeight: 500,
                      }}
                    >
                      ${row.Prems}
                    </TableCell>
                    <TableCell align="right">
                      {row.Side && (
                        <Chip
                          label={row.Side}
                          variant="outlined"
                          sx={{
                            border: `1px solid ${
                              row.Side === 'BELOW BID ' ||
                              row.side === 'ABOVE ASK'
                                ? '#FFD700'
                                : row.Side === 'MID'
                                ? '#96AED0'
                                : '#DDFFE7'
                            }`,
                            fontWeight: 500,
                            // height: '24px',
                            boxShadow: `0 0 6px 0px ${
                              row.Side === 'BELOW BID ' ||
                              row.side === 'ABOVE ASK'
                                ? '#FFD700'
                                : row.Side === 'MID'
                                ? '#96AED0'
                                : '#DDFFE7'
                            };`,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">{row.DTE.slice(0, -1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </InfiniteScroll>
        )}
      </TableContainer>
    </Paper>
  );
};
