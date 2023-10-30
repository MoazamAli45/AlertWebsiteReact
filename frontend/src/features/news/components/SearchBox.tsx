import { Autocomplete, debounce, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import jsonData from '@/assets/data/tickers.json';

interface JSONData {
  cik_str: number;
  ticker: string;
  title: string;
}

interface SearchBoxProps {
  onTickerChange: (value: string[]) => void;
}

export const SearchBox = ({ onTickerChange }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [data] = useState<JSONData[]>(Object.values(jsonData));
  const [options, setOptions] = useState<JSONData[]>([]);
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
        const input = inputValue.toLowerCase();
        setOptions(
          data.filter((option) => option.ticker.toLowerCase().includes(input)),
        );
        setLoading(false);
      }
    }, 500),
    [],
  );

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option?.ticker || ''
      }
      renderOption={(props, option) => (
        <li {...props}>
          {option.ticker} {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add tickers..." />
      )}
      onChange={(_, newValue) => {
        onTickerChange(newValue.map((d) => d.ticker));
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
        minWidth: 200,
        '& .MuiChip-root': {
          backgroundColor: 'primary.dark',
        },
      }}
      fullWidth
      autoHighlight
    />
  );
};
