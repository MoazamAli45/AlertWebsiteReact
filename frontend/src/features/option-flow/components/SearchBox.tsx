import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useFetchSymbols } from '@/features/option-flow/api/queries';
import { debounce } from '@/utils/debounce';

interface SymbolProps {
  cikStr: number;
  ticker: string;
  title: string;
}

interface SearchBoxProps {
  onSymbolChange: (value: string[]) => void;
}

export const SearchBox = ({
  onSymbolChange: onSymbolChange,
}: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string[]>([]);
  const { data, refetch } = useFetchSymbols({ value: inputValue, limit: 10 });
  const [options, setOptions] = useState(data?.symbols || []);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newSymbols =
      data?.symbols?.filter(
        (symbol: SymbolProps) => !value.includes(symbol.ticker),
      ) || [];
    setOptions(newSymbols);
    setLoading(false);
  }, [data, value]);

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
        setLoading(true);
        refetch();
      }
    }, 500),
    [],
  );

  return (
    <Autocomplete
      multiple
      options={options}
      // override default filterOptions to disable the built-in filtering
      filterOptions={(x) => x}
      getOptionLabel={(option: SymbolProps) =>
        typeof option === 'string' ? option : option?.ticker || ''
      }
      renderOption={(props, option: SymbolProps) => (
        <li {...props}>
          {option.ticker} {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add tickers..." />
      )}
      // @ts-ignore
      value={value}
      onChange={(_, newValue) => {
        const tickers = newValue.map((symbol: string | SymbolProps) =>
          typeof symbol === 'string' ? symbol : symbol?.ticker,
        );
        setValue(tickers);
        onSymbolChange(tickers);
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onKeyUp={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') return;

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
