import React, { useState, useEffect, useCallback } from 'react';
import { ContractTag, TagRow } from './Tag';
import { useDebounce } from '../hooks';
import { Box, Divider, Slider, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { optionFlowConfig } from '../config';
import { SearchBox } from './SearchBox';
import { useAppDispatch } from '@/store/hooks';
import { resetOrders } from '@/store/orderReducer';
interface FiltersProps {
  onExpireChange: (expire: number[]) => void;
  onPremiumChange: (premium: number[]) => void;
  onTimeChange: (time: string | null) => void;
  onTickersChange: (tickers: { label: string; key: string }[]) => void;
  onContractChange: (contracts: { C: boolean; P: boolean }) => void;
}

function disableWeekends(date: DateTime) {
  return date.weekday === 6 || date.weekday === 7;
}

const Filters: React.FC<FiltersProps> = ({
  onExpireChange,
  onPremiumChange,
  onTimeChange,
  onTickersChange,
  onContractChange,
}) => {
  const dispatch = useAppDispatch();
  const [tickers, setTickers] = useState<{ label: string; key: string }[]>([]);
  const [contracts, setContracts] = useState({
    C: true,
    P: true,
  });
  const [expire, setExpire] = useState([0, optionFlowConfig.maxExpiration]);
  const [premium, setPremium] = useState([0, 1]);
  const [time, setTime] = useState<DateTime | null>(
    DateTime.now().setZone('America/New_York'),
    // DateTime.local(2023, 11, 8).setZone('America/New_York'),
  );
  // console.log(date);
  const debouncedExpire = useDebounce(expire, 500);
  const debouncedPremium = useDebounce(premium, 100);
  const debouncedTime = useDebounce(time, 500);
  // console.log('debouncedTime', time?.toISO());
  // const lastFormattedDate: any = useRef(null);

  useEffect(() => {
    // // Handle the expiration state change
    // // You can replace this logic with your own state management
    // console.log('Expire State:', debouncedExpire);
    onExpireChange(debouncedExpire);
  }, [debouncedExpire, onExpireChange]);

  useEffect(() => {
    // Handle the premium state change
    // You can replace this logic with your own state management
    // console.log('Premium State:', debouncedPremium);
    onPremiumChange(debouncedPremium);
  }, [debouncedPremium, onPremiumChange]);

  useEffect(() => {
    // Handle the time state change
    // You can replace this logic with your own state management
    // console.log('Time State:', debouncedTime);
    if (debouncedTime) {
      const date = new Date(
        debouncedTime.year,
        debouncedTime.month - 1,
        debouncedTime.day + 1,
        debouncedTime.hour,
        debouncedTime.minute,
      );

      // Get the date string in the format "YYYY-MM-DD"
      const formattedDate = date.toISOString().slice(0, 10);

      // Check if the date has actually changed before triggering state updates

      onTimeChange(formattedDate);
    }
  }, [debouncedTime, onTimeChange, dispatch]);
  useEffect(() => {
    onContractChange(contracts);
  }, [contracts, onContractChange]);

  const handlePremiumChange = (_: Event, newValue: number | number[]) => {
    setPremium(newValue as number[]);
  };

  const handleExpireChange = (_: Event, newValue: number | number[]) => {
    setExpire(newValue as number[]);
  };

  const handleToggleContract = useCallback((value: Record<string, boolean>) => {
    setContracts({ ...value } as { C: boolean; P: boolean });
  }, []);
  // console.log(time, 'TIME');
  // console.log(tickers, 'From filter');
  useEffect(() => {
    onTickersChange(tickers);
  }, [tickers, onTickersChange]);
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider orientation="vertical" flexItem />}
      gap={{ xs: 2, lg: 4 }}
      my={2}
    >
      <div>
        <Stack gap={1.5}>
          <Typography variant="body1">Symbol</Typography>
          <SearchBox tickers={tickers} setTickers={setTickers} />
        </Stack>
        <Stack gap={1.5} mt={2}>
          <Typography variant="body1">Contract</Typography>
          <TagRow
            values={contracts}
            Component={ContractTag}
            onChange={handleToggleContract}
          />
        </Stack>
      </div>
      <div>
        <Stack gap={1.5}>
          <Typography variant="body1">
            Expires in: {expire[0].toLocaleString(undefined)} -{' '}
            {expire[1] === optionFlowConfig.maxExpiration
              ? 'any'
              : expire[1].toLocaleString(undefined)}
            {' days'}
          </Typography>
          <Box sx={{ minWidth: '200px', px: 1 }}>
            <Slider
              min={0}
              max={optionFlowConfig.maxExpiration}
              step={1}
              defaultValue={[0, optionFlowConfig.maxExpiration]}
              onChange={handleExpireChange}
            />
          </Box>
        </Stack>
        <Stack gap={1.5} mt={2}>
          <Typography variant="body1">
            Premium: $
            {(premium[0] * optionFlowConfig.maxPremium).toLocaleString(
              undefined,
            )}{' '}
            -{' '}
            {premium[1] === 1
              ? 'any'
              : '$' +
                (premium[1] * optionFlowConfig.maxPremium).toLocaleString(
                  undefined,
                )}
          </Typography>
          <Box sx={{ minWidth: '200px', px: 1, mb: -1 }}>
            <Slider
              min={0}
              max={1}
              step={0.01}
              defaultValue={[0, 1]}
              onChange={handlePremiumChange}
            />
          </Box>
        </Stack>
      </div>
      <div>
        <Stack gap={2}>
          <Typography variant="body1">Pick a date</Typography>
          <DateTimePicker
            // ref={lastFormattedDate}
            value={time}
            onChange={(newValue) => {
              setTime(newValue);
              dispatch(resetOrders());
            }}
            sx={{
              width: 245,
              '& .MuiInputBase-root': {
                bgcolor: 'background.default',
              },
            }}
            shouldDisableDate={disableWeekends}
            disableFuture
          />
        </Stack>
      </div>
    </Stack>
  );
};

export default Filters;
