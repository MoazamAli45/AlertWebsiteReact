import {
  Box,
  Stack,
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead as MuiTableHead,
  IconButton,
  Tooltip,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useState } from 'react';
import { Slider } from '../Slider';
// import longCallData from '@/assets/data/long-call.json';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { Settings } from 'luxon';

interface Props {
  apiData: any;
  strikeItem: any;
  strikeData: any;
}

Settings.defaultZone = 'America/New_York';

function round(value: number, precision = 1) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const Table = ({ apiData, strikeItem, strikeData }: Props) => {
  const volatility = strikeData?.volatility || 0;
  const impliedVolatility = volatility !== 'NaN' ? volatility : 0;
  const minImpliedVolatility = round(impliedVolatility / 10);
  const maxImpliedVolatility = round(impliedVolatility * 3);

  const [sliderValues, setSliderValues] = useState({
    chartRange: 22,
    impliedVolatility: round(impliedVolatility),
  });

  useEffect(() => {
    setSliderValues((sliderValues) => ({
      ...sliderValues,
      impliedVolatility: round(impliedVolatility),
    }));
  }, [impliedVolatility]);

  const changeHandler = (sliderName: string, sliderValue: any) => {
    setSliderValues({ ...sliderValues, [sliderName]: sliderValue });
  };

  // const callsData =
  //   longCallData[0].data?.optionChain?.result[0].options[0].calls;

  // const expirationDates = Object.keys(apiData?.callExpDateMap);

  const callsData = Object.values(strikeItem).flat();

  return Object.keys(apiData).length > 0 ? (
    <Box my={4}>
      <Paper
        sx={{
          mt: 1,
          p: 1,
          borderRadius: '6px',
          overflow: 'hidden',
          width: '100%',
          flexGrow: 1,
          minHeight: 150,
          position: 'relative',
          pl: 12,
        }}
      >
        {strikeData?.expirationDate && (
          <TableContainer
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <MuiTable
              sx={{ minWidth: 1570, width: '100%' }}
              aria-labelledby="tableTitle"
              size="small"
              stickyHeader
            >
              <MuiTableHead>
                <TableHead
                  expirationDate={strikeData?.expirationDate}
                  daysToExpiration={strikeData?.daysToExpiration}
                />
              </MuiTableHead>
              {callsData.length > 0 && (
                <TableBody
                  callsData={callsData}
                  stockPrice={apiData.underlyingPrice}
                  interestRate={apiData.interestRate}
                  {...sliderValues}
                  expirationDate={strikeData?.expirationDate}
                  strikePrice={strikeData?.strikePrice}
                />
              )}
            </MuiTable>
          </TableContainer>
        )}
      </Paper>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: 1, md: 4 }}
        mx={1}
        mt={2}
      >
        <Slider
          name={'chartRange'}
          text={'CHART RANGE: ±'}
          value={sliderValues.chartRange}
          onChange={changeHandler}
        />
        <Slider
          name="impliedVolatility"
          text={'IMPLIED VOLATILITY: '}
          value={sliderValues.impliedVolatility}
          min={minImpliedVolatility}
          max={maxImpliedVolatility}
          onChange={changeHandler}
          action={
            <Tooltip title="Reset">
              <IconButton
                size="small"
                onClick={() =>
                  changeHandler('impliedVolatility', impliedVolatility)
                }
              >
                <ReplayIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        />
      </Stack>
    </Box>
  ) : (
    apiData && <h1 style={{ textAlign: 'center' }}>NO DATA!</h1>
  );
};

