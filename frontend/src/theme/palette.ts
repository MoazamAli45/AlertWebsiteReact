import { PaletteOptions } from '@mui/material/styles';

const text = {
  primary: 'rgba(255, 255, 255, 0.95)',
  secondary: 'rgba(255, 255, 255, 0.5)',
};

export const palette = {
  background: {
    default: 'rgb(27, 38, 53)',
    paper: 'rgb(35, 48, 68)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  primary: {
    main: 'rgb(71, 130, 218)',
  },
  secondary: {
    main: 'rgb(56, 142, 60);',
  },
  text,
  action: {
    active: text.primary,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
} as PaletteOptions;
