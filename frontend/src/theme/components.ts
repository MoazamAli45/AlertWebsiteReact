import { Components, Theme } from '@mui/material/styles';
import { palette } from './palette';

export const components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgb(27, 38, 53)',
        boxShadow: 'none',
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          color: `${palette.action?.disabled} !important`,
        },
      },
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: '1px solid rgba(81, 81, 81)',
      },
    },
  },
} as Components<Omit<Theme, 'components'>>;
