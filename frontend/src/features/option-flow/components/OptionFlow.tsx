import { TableToolbar } from './TableToolbar';
import { Stack } from '@mui/material';
import FlowContextProvider from '../contexts/FlowContext';
import { Table } from './Table';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings } from 'luxon';
import { Statistics } from './Statistics';
import { PremiumChart } from '@/features/option-flow/components/PremiumChart';
import { TopPurchasesChart } from '@/features/option-flow/components/TopPurchasesChart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { getOrders } from '@/store/orderReducer';
import { cleanOrders } from '@/utils/cleanOrders';
import { formatedDate } from '@/utils/formattedDate';
Settings.defaultZone = 'America/New_York';

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
const convertPremsToNumber = (prems: string): number => {
  if (prems.endsWith('k')) {
    return parseFloat(prems.replace('k', '')) * 1000;
  } else if (prems.endsWith('m')) {
    return parseFloat(prems.replace('m', '')) * 1000000;
  } else {
    return parseFloat(prems);
  }
};

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
    // Handle the expiration state change at the parent level
    console.log('Expire State at Parent:', expire);
    // Add your logic to update the parent component's state as needed
    setExpire(expire);
  };

  const handlePremiumChange = (premium: number[]) => {
    // Handle the premium state change at the parent level
    console.log('Premium State at Parent:', premium);
    // Add your logic to update the parent component's state as needed
    setPremium(premium);
  };

  const handleTimeChange = (time: string | null) => {
    // Handle the time state change at the parent level
    console.log('Time State at Parent:', time);
    // Add your logic to update the parent component's state as needed
    setTime(time);
  };

  const handleTickersChange = (tickers: { label: string; key: string }[]) => {
    // Handle the tickers state change at the parent level
    console.log('Tickers State at Full Parent:', tickers);
    // Add your logic to update the parent component's state as needed
    setTickers(tickers);
  };
  const handleContractChange = (contracts: { C: boolean; P: boolean }) => {
    // Handle the contracts state change at the parent level
    console.log('Contracts State at Full Parent:', contracts);
    // Add your logic to update the parent component's state as needed
    setContracts(contracts);
  };

  const handlePage = (pageNo: number) => {
    console.log('PARENT', pageNo);
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
      console.log('premsValue', premsValue);
      const normalizedPremium = premsValue / 1000000000;
      console.log('normalizedPremium', normalizedPremium);
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

    // Log the filtered orders
    console.log('Filtered Orders:', newFilteredOrders);
  };

  console.log('filteredOrders', filteredOrders);
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
      <FlowContextProvider>
        <Stack direction="row" sx={{ height: '100%' }} gap={1}>
          <Stack gap={1} maxWidth={425}>
            {/* <PremiumChart /> */}
            <TopPurchasesChart />
          </Stack>
          <Stack gap={1} flexGrow={1}>
            <TableToolbar
              onTickersChange={handleTickersChange}
              onExpireChange={handleExpireChange}
              onPremiumChange={handlePremiumChange}
              onTimeChange={handleTimeChange}
              onContractChange={handleContractChange}
            />
            <Statistics />
            <Table orders={filteredOrders} onPageChange={handlePage} />
          </Stack>
        </Stack>
      </FlowContextProvider>
    </LocalizationProvider>
  );
};
