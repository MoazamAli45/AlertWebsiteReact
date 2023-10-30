import {
  Toolbar,
  Typography,
  Tooltip,
  Stack,
  Button,
  Collapse,
  Paper,
  styled,
} from '@mui/material';
import FilterIcon from '@/assets/icons/Filter';
import { palette } from '@/theme/palette';
import { useState } from 'react';
import Filters from './Filters';
import { ReloadDropDown } from './ReloadDropDown';
import { Box } from '@mui/system';

const FilterButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 0,
  },
  '& .MuiBox-root': {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export function TableToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ borderRadius: '6px' }}>
      <Toolbar sx={{ px: { xs: 2 }, py: 1 }}>
        <Stack width="100%">
          <Stack direction="row" alignItems="center">
            <Tooltip title="Filter data">
              <FilterButtonStyled
                startIcon={<FilterIcon fill={palette.background?.paper} />}
                onClick={() => setOpen(!open)}
              >
                <Box component="span">Filter</Box>
              </FilterButtonStyled>
            </Tooltip>
            <Typography
              sx={{
                flex: '1 1 100%',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: {
                  xs: 'calc(0.85em + 1vw)',
                  md: '1.35rem',
                },
              }}
              variant="h5"
            >
              Option Order Flow
            </Typography>
            <Tooltip title="Refresh data">
              <ReloadDropDown />
            </Tooltip>
          </Stack>
          <Collapse in={open}>
            <Filters />
          </Collapse>
        </Stack>
      </Toolbar>
    </Paper>
  );
}
