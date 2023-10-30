import {
  Box,
  Slider as MuiSlider,
  Stack,
  Typography,
  TextField,
} from '@mui/material';

type Props = {
  name: string;
  text: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (name: string, value: number | number[]) => void;
  action?: React.ReactNode;
};

export const Slider = ({
  name,
  text,
  value,
  min = 1,
  max = 100,
  onChange,
  action,
}: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let normVal;
    if (typeof max === 'number' && typeof min === 'number') {
      normVal = Math.min(Number(event.target.value), max);
      normVal = Math.max(Number(event.target.value), min);
    }
    onChange(name, Number(normVal));
  }

  return (
    <Box width="100%">
      <Stack
        direction="row"
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: 35,
          gap: 2,
        }}
      >
        <Typography>
          {text}
          {/*<Box component="span" sx={{ fontWeight: 600 }}>*/}
          {/*  /!*{value}%*!/*/}
          {/*</Box>*/}
        </Typography>
        <TextField
          type="number"
          value={value}
          onChange={handleChange}
          size="small"
        />
        {/*  add %*/}
        {action}
      </Stack>
      <MuiSlider
        min={min}
        max={max}
        value={value}
        step={0.5}
        onChange={(_: Event, value) => onChange(name, value)}
        sx={{ width: '100%' }}
      />
    </Box>
  );
};
