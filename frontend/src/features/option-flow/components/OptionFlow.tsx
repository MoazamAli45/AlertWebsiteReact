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

Settings.defaultZone = 'America/New_York';

export const OptionFlow = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
      <FlowContextProvider>
        <Stack direction="row" sx={{ height: '100%' }} gap={1}>
          <Stack gap={1} maxWidth={425}>
            <PremiumChart />
            <TopPurchasesChart />
          </Stack>
          <Stack gap={1} flexGrow={1}>
            <TableToolbar />
            <Statistics />
            <Table />
          </Stack>
        </Stack>
      </FlowContextProvider>
    </LocalizationProvider>
  );
};
