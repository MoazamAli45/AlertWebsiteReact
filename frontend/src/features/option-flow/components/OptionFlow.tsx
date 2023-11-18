import { TableToolbar } from './TableToolbar';
import { Stack } from '@mui/material';
import { Table } from './Table';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings } from 'luxon';
import { Statistics } from './Statistics';
import { PremiumChart } from '@/features/option-flow/components/PremiumChart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { getOrders } from '@/store/orderReducer';
import { cleanOrders } from '@/utils/cleanOrders';
import { formatedDate } from '@/utils/formattedDate';
import { Order } from '../types';
import { convertPremsToNumber } from '@/utils/convertPremsToNumber';
Settings.defaultZone = 'America/New_York';

export const OptionFlow = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [pageNo, setPage] = useState<number>(1);
  const [time, setTime] = useState<string | null>(
    //    REPLACED BY DATE.now()
    //                                    TODO
    formatedDate(new Date(2023, 10, 8)),
  );
  const [contracts, setContracts] = useState<{ C: boolean; P: boolean }>({
    C: true,
    P: true,
  });
  const [expire, setExpire] = useState<number[]>([0, 800]);
  const [premium, setPremium] = useState<number[]>([0, 1]);
  const cleanedOrders: Order[] = [];
  const [tickers, setTickers] = useState<{ label: string; key: string }[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(cleanedOrders);
  useEffect(() => {
    dispatch(getOrders({ pageNo, time }));
  }, [dispatch, pageNo, time]);
  // console.log('orders', orders);
  useEffect(() => {
    let cleanedOrders: Order[] = [];
    if (orders) {
      cleanedOrders = cleanOrders(orders);
    }
    applyFilters(contracts, tickers, premium, expire, cleanedOrders);
  }, [contracts, tickers, orders, premium, expire]);

  const handleExpireChange = (expire: number[]) => {
    setExpire(expire);
  };

  const handlePremiumChange = (premium: number[]) => {
    setPremium(premium);
  };
  console.log(refresh);
  const refreshHandler = (refresh: boolean) => {
    setRefresh(refresh);
    dispatch(getOrders({ pageNo, time }));
    setRefresh(false);
  };
  const handleTimeChange = (time: string | null) => {
    setTime(time);
  };

  const handleTickersChange = (tickers: { label: string; key: string }[]) => {
    setTickers(tickers);
  };
  const handleContractChange = (contracts: { C: boolean; P: boolean }) => {
    setContracts(contracts);
  };

  const handlePage = (pageNo: number) => {
    setPage(pageNo);
  };
  const applyFilters = (
    currentContracts: { C: boolean; P: boolean },
    currentTickers: { label: string; key: string }[],
    premiumRange: number[], // [min, max]
    expireRange: number[], // [min, max]
    cleanedOrders: Order[],
  ) => {
    const newFilteredOrders = cleanedOrders.filter((order) => {
      const isCall = order['C/P'] === 'CALL';
      const isPut = order['C/P'] === 'PUT';

      // Check if the order matches the selected contracts
      const matchesContracts =
        (currentContracts.C && isCall) || (currentContracts.P && isPut);

      // Check if the order's Symbol matches any of the selected tickers
      const matchesTickers =
        currentTickers.length === 0 ||
        currentTickers.some((ticker) => order.Symbol === ticker.label);
      // Convert the "Prems" attribute to numeric value
      const premsValue = convertPremsToNumber(order.Prems);
      const normalizedPremium = premsValue / 1000000000;
      // Check if the order matches the premium range
      const matchesPremiumRange =
        premiumRange[0] <= normalizedPremium &&
        normalizedPremium <= premiumRange[1];

      // Parse the timestamps for "Time" and "Exp Date"
      const timeTimestamp = new Date(order.Time).getTime();
      const expDateTimestamp = new Date(order['Exp Date']).getTime();

      // Calculate the expiration duration in milliseconds
      const expirationDuration = expDateTimestamp - timeTimestamp;
      // Check if the expiration duration falls within the given range
      const expirationDurationInDays =
        expirationDuration / (1000 * 60 * 60 * 24);

      const matchesExpireRange =
        expirationDurationInDays >= expireRange[0] &&
        expirationDurationInDays <= expireRange[1];
      // Return true only if all conditions are satisfied

      return (
        matchesContracts &&
        matchesTickers &&
        matchesPremiumRange &&
        matchesExpireRange
      );
    });

    // Update the filtered orders state
    setFilteredOrders(newFilteredOrders);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
      <Stack direction="row" sx={{ height: '100%' }} gap={1}>
        <Stack gap={1} maxWidth={425}>
          <PremiumChart />
        </Stack>
        <Stack gap={1} flexGrow={1}>
          <TableToolbar
            onTickersChange={handleTickersChange}
            onExpireChange={handleExpireChange}
            onPremiumChange={handlePremiumChange}
            onTimeChange={handleTimeChange}
            onContractChange={handleContractChange}
            onRefresh={refreshHandler}
          />
          <Statistics />
          <Table orders={filteredOrders} onPageChange={handlePage} />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
