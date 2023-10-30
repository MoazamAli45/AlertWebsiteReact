import { useState } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';
import { SearchBox } from './SearchBox';
import { Expiration } from './Expiration';
import { TableCarousel } from './TableCarousel';
import { Table } from './Table';
import { useQuery } from '@tanstack/react-query';
import { fetchOptions } from '../api';
import { ReloadDropDown } from '@/features/long-call/components/ReloadDropDown';

export const LongCall = () => {
  const [ticker, setTicker] = useState<string>('SPY');
  const [strikeItem, setStrikeItem] = useState({});
  const [strikeData, setStrikeData] = useState([]);

  // TODO: cancel request before making a new one
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['options', ticker],
    queryFn: () => fetchOptions(ticker as string),
    enabled: !!ticker,
  });

  const handleTickerChange = (value: string) => {
    setTicker(value);
  };

  return (
    <Stack>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <SearchBox onTickerChange={handleTickerChange} ticker={ticker} />
        {data && (
          <Typography variant="body1" sx={{ fontWeight: '600' }}>
            ${data.underlyingPrice?.toFixed(2)}
          </Typography>
        )}
        <Tooltip title="Refresh data">
          <span>
            <ReloadDropDown
              isFetching={isFetching}
              onClick={() => refetch()}
              disabled={isFetching}
              size="small"
            />
          </span>
        </Tooltip>
      </Stack>
      {data && (
        <>
          <Expiration
            apiData={data}
            strikeItem={strikeItem}
            setStrikeItem={setStrikeItem}
            setStrikeData={setStrikeData}
          />
          <TableCarousel strikeData={strikeData} />
          <Table
            apiData={data}
            strikeItem={strikeItem}
            strikeData={strikeData}
          />
        </>
      )}
    </Stack>
  );
};
