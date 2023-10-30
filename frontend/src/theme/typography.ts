import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material/styles';

export const typography = {
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  h6: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: '0.696429rem',
  },
} as TypographyOptions | ((palette: Palette) => TypographyOptions);
