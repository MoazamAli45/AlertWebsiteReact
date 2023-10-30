import { ExpirationDataItem } from '../types';
import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Strikes from './Strikes';

const monthsName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type ExpirationProps = {
  apiData: any;
  strikeItem: Record<string, any>;
  setStrikeItem: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setStrikeData: React.Dispatch<React.SetStateAction<never[]>>;
};

export const Expiration = ({
  apiData,
  strikeItem,
  setStrikeItem,
  setStrikeData,
}: ExpirationProps) => {
  const [activeItem, setActiveItem] = React.useState<string>('');
  const expirationData: ExpirationDataItem[] = [];

  const expirationDates: any =
    apiData && Object.keys(apiData?.callExpDateMap).map((d) => d.slice(0, 10));

  const distinctDates =
    expirationDates &&
    Array.from(new Set(expirationDates?.map((d: string) => d.slice(0, 7))));

  distinctDates &&
    distinctDates.map((month: string) =>
      expirationData.push({ month, days: [] }),
    );

  expirationDates &&
    expirationDates.map((date: string) =>
      expirationData.map((item) => {
        if (date.slice(0, 7) === item.month) {
          item.days.push(Number(date.slice(8, 11)));
        }
      }),
    );

  useEffect(() => {
    const firstDate = `${expirationData[0]?.month}-${expirationData[0]?.days[0]}`;
    handleClickDate(firstDate);
  }, [apiData]);

  const handleClickDate = (newActiveItem: string) => {
    setActiveItem(newActiveItem);

    const data = apiData && apiData?.callExpDateMap;
    for (const key in data) {
      if (key.slice(0, 10) === newActiveItem) {
        setStrikeItem(data[key]);
      }
    }
  };

  return (
    <>
      <Stack mt={3} gap={2}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Expiration:
        </Typography>

        <Stack direction="row" gap={2} flexWrap="wrap">
          {expirationData.map((item, index) => (
            <Paper key={index} sx={{ p: 1 }}>
              <Stack gap={1.25} alignItems="center">
                <Box sx={{ color: 'text.secondary' }}>
                  {`${
                    monthsName[Number(item.month.slice(5, 7)) - 1]
                  } ${item.month.slice(0, 4)}`}
                </Box>
                <Stack direction="row" gap={2} flexWrap="wrap">
                  {item.days.map((day) => (
                    <Button
                      key={`${item.month}-${day}`}
                      sx={{
                        minWidth: 90,
                        py: 0.25,
                        backgroundColor:
                          activeItem ===
                          `${item.month}-${String(day).padStart(2, '0')}`
                            ? 'primary.main'
                            : 'background.default',
                        color:
                          activeItem ===
                          `${item.month}-${String(day).padStart(2, '0')}`
                            ? 'text.primary'
                            : 'primary.main',
                      }}
                      onClick={() =>
                        handleClickDate(
                          `${item.month}-${String(day).padStart(2, '0')}`,
                        )
                      }
                    >
                      {day}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          ))}
          <Strikes
            apiData={apiData}
            strikeItem={strikeItem}
            setStrikeData={setStrikeData}
          />
        </Stack>
      </Stack>
    </>
  );
};
