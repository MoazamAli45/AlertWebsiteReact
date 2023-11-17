import React, { useCallback, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { cleanOrders } from '@/utils/cleanOrders';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';

interface SearchBoxProps {
  tickers: { label: string; key: string }[];
  setTickers: React.Dispatch<
    React.SetStateAction<{ label: string; key: string }[]>
  >;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  tickers,
  setTickers,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { orders } = useAppSelector((state) => state.order);
  let cleanedOrders: any[] = [];
  if (orders) {
    cleanedOrders = cleanOrders(orders);
  }
  const [options, setOptions] = useState<{ label: string; key: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (_: React.SyntheticEvent<Element, Event>, newValue: string) => {
      setInputValue(newValue);
      const lowercasedValue = newValue.toLowerCase();
      const newSymbols =
        cleanedOrders
          .map((order) => order.Symbol)
          .filter((symbol) => symbol.toLowerCase().includes(lowercasedValue)) ||
        [];

      // Use a Set to keep track of unique labels
      const uniqueLabels = new Set<string>();

      // Add unique keys to each option
      const optionsWithKeys = newSymbols.reduce((acc, symbol) => {
        const lowercasedSymbol = symbol.toLowerCase();
        if (!uniqueLabels.has(lowercasedSymbol)) {
          uniqueLabels.add(lowercasedSymbol);
          acc.push({
            label: symbol,
            key: nanoid(), // Use a unique identifier as the key
          });
        }
        return acc;
      }, [] as { label: string; key: string }[]);

      setOptions(optionsWithKeys);
      setOpen(true);
      setLoading(false);
    },
    [cleanedOrders],
  );

  return (
    <Autocomplete
      multiple
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <li key={option.key} {...props}>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add tickers..." />
      )}
      value={tickers}
      onChange={(_, newValue: { label: string; key: string }[]) => {
        // Extract the label values from newValue
        setTickers(newValue);
        // console.log(newValue, 'Checked');
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onKeyUp={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') return;
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      popupIcon={null}
      loading={loading}
      noOptionsText={
        loading ? (
          <CircularProgress size={20} />
        ) : (
          <Typography>No data found</Typography>
        )
      }
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          backgroundColor: 'background.paper',
        },
        minWidth: 500,
        '& .MuiChip-root': {
          backgroundColor: 'primary.dark',
        },
      }}
      fullWidth
      autoHighlight
    />
  );
};
