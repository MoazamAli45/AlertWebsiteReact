import { useFlowContext } from '../contexts/FlowContext';
import { optionFlowConfig } from '../config';
import { useState, useEffect, useCallback } from 'react';
import { ContractTag, TagRow } from './Tag';
import { useDebounce } from '../hooks';
import { Box, Divider, Slider, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { useFetchOrdersQuery } from '@/features/option-flow/api/queries';
import { SearchBox } from '@/features/option-flow/components/SearchBox';

function disableWeekends(date: DateTime) {
  return date.weekday === 6 || date.weekday === 7;
}

export default function Filters() {
  const { isLoading } = useFetchOrdersQuery();
  const { state, dispatch } = useFlowContext();
  const [expire, setExpire] = useState([0, optionFlowConfig.maxExpiration]);
  const [premium, setPremium] = useState([0, 1]);
  const [time, setTime] = useState<DateTime | null>(state.time);
  const debouncedExpire = useDebounce(expire, 500);
  const debouncedPremium = useDebounce(premium, 100);
  const debouncedTime = useDebounce(time, 500);

  useEffect(
    () => dispatch({ type: 'setExpire', value: debouncedExpire }),
    [debouncedExpire, dispatch],
  );
  useEffect(
    () => dispatch({ type: 'setPremium', value: debouncedPremium }),
    [debouncedPremium, dispatch],
  );

  useEffect(
    () => dispatch({ type: 'setTime', value: debouncedTime }),
    [debouncedTime, dispatch],
  );

  const handlePremiumChange = (_: Event, newValue: number | number[]) => {
    setPremium(newValue as number[]);
  };

  const handleExpireChange = (_: Event, newValue: number | number[]) => {
    setExpire(newValue as number[]);
  };

  const handleSymbolChange = useCallback(
    (value: string[]) => {
      if (!isLoading) {
        const defaultSymbols = optionFlowConfig.symbols.reduce(
          (acc, s) => ({
            ...acc,
            [s.toUpperCase()]: false,
          }),
          {},
        );

        let symbols = value.reduce(
          (acc, s) => ({
            ...acc,
            [s.toUpperCase()]: true,
          }),
          defaultSymbols,
        );

        if (value.length === 0)
          symbols = optionFlowConfig.symbols.reduce(
            (acc, s) => ({
              ...acc,
              [s.toUpperCase()]: true,
            }),
            symbols,
          );

        dispatch({ type: 'setSymbols', value: symbols });
      }
    },
    [isLoading, dispatch],
  );

  const handleToggleContract = useCallback(
    (value: Record<string, boolean>) => {
      if (!isLoading) dispatch({ type: 'setContracts', value: { ...value } });
    },
    [isLoading, dispatch],
  );

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
          <SearchBox onSymbolChange={handleSymbolChange} />
        </Stack>
        <Stack gap={1.5} mt={2}>
          <Typography variant="body1">Contract</Typography>
          <TagRow
            values={state.contracts}
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
            value={time}
            onChange={(newValue) => setTime(newValue)}
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
}
