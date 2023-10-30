import { Autocomplete, Box, debounce, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import jsonData from '@/assets/data/tickers.json';

interface JSONData {
  cik_str: number;
  ticker: string;
  title: string;
}

interface SearchBoxProps {
  ticker: string;
  onTickerChange: (value: string) => void;
}

export const SearchBox = ({ ticker, onTickerChange }: SearchBoxProps) => {
  const [data] = useState<JSONData[]>(Object.values(jsonData));
  const [inputValue, setInputValue] = useState<string>(ticker);
  const defaultValue = useMemo(
    () => data.find((option) => option.ticker === ticker),
    [ticker],
  );
  const [value, setValue] = useState<JSONData | null>(defaultValue || null);
  const [options, setOptions] = useState<JSONData[]>(
    filterOptions(data, ticker),
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    setInputValue(newValue);
    if (newValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const debounceUpdateOptions = useCallback(
    debounce((inputValue) => {
      if (inputValue.length > 0) {
        setOptions(filterOptions(data, inputValue));
        setLoading(false);
      }
    }, 500),
    [],
  );

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option?.ticker || ''
      }
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search..." />
      )}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        onTickerChange(newValue?.ticker || '');
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onKeyUp={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') return;

        setOptions([]);
        setLoading(true);
        debounceUpdateOptions((e.target as HTMLInputElement).value);
      }}
      open={open}
      onOpen={() => inputValue.length > 0 && setOpen(true)}
      onClose={() => setOpen(false)}
      popupIcon={null}
      loading={loading}
      noOptionsText="No ticker found"
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          backgroundColor: 'background.paper',
        },
        minWidth: { xs: 228, md: 300 },
      }}
      autoHighlight
    />
  );
};

const filterOptions = (data: JSONData[], inputValue: string) => {
  const ticker = inputValue.toLowerCase();
  return data.filter((option) => option.ticker.toLowerCase().includes(ticker));
};

const renderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: JSONData,
) => (
  <Box
    component="li"
    {...props}
    sx={{
      display: 'inline-block !important',
      '& span:first-of-type': {
        fontWeight: 'bold',
      },
      '& span:last-of-type': {
        fontSize: option.title?.length < 20 ? '1rem' : '0.875rem',
      },
    }}
  >
    <span>{option.ticker}</span> <span>{option.title}</span>
  </Box>
);
