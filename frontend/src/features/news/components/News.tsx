import { fetchNews } from '@/features/news/api';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card } from './Card';
import { SearchBox } from './SearchBox';

const LIMIT = 12;

export const News = () => {
  const { ref, inView } = useInView();

  const [tickers, setTickers] = useState<string[]>([]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['news', tickers],
      async ({ pageParam = 1 }) =>
        fetchNews({ tickers, page: pageParam, limit: LIMIT }),
      {
        getNextPageParam: (lastPage) =>
          lastPage.meta.found / LIMIT > lastPage.meta.page
            ? lastPage.meta.page + 1
            : undefined,
      },
    );

  const onTickerChange = (tickers: string[]) => {
    setTickers([...tickers]);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Stack gap={3} sx={{ height: '100%' }}>
      <SearchBox onTickerChange={onTickerChange} />
      {data && (
        <Grid container columnSpacing={2} rowSpacing={3} alignItems="stretch">
          {data.pages.map((page: any) => (
            <React.Fragment key={page.meta.page}>
              {page.data.map((item: any) => (
                <Grid key={item.uuid} xs={12} sm={6} md={4} lg={3}>
                  <Card item={item} />
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      )}
      {isLoading && (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading...
          </Typography>
        </Box>
      )}
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 2,
          pb: 4,
        }}
      >
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </Stack>
  );
};
