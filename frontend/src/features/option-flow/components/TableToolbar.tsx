import {
  Toolbar,
  Typography,
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
import { Refresh } from '@/assets/icons';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types'; // Import PropTypes
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
interface TableToolsProps {
  onExpireChange: (expire: number[]) => void;
  onPremiumChange: (premium: number[]) => void;
  onTimeChange: (time: string | null) => void;
  onTickersChange: (tickers: { label: string; key: string }[]) => void;
  onContractChange: (contracts: { C: boolean; P: boolean }) => void;
  onRefresh: (refresh: boolean) => void;
}

export const TableToolbar: React.FC<TableToolsProps> = ({
  onExpireChange,
  onPremiumChange,
  onTimeChange,
  onTickersChange,
  onContractChange,
  onRefresh,
}) => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleExpireChange = (expire: number[]) => {
    onExpireChange(expire);
  };

  const handlePremiumChange = (premium: number[]) => {
    onPremiumChange(premium);
  };

  const handleTimeChange = (time: string | null) => {
    onTimeChange(time);
  };

  const handleTickersChange = (tickers: { label: string; key: string }[]) => {
    onTickersChange(tickers);
  };
  const handleContractChange = (contracts: { C: boolean; P: boolean }) => {
    onContractChange(contracts);
  };
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
              <IconButton
                onClick={() => {
                  setRefresh(!refresh);
                  onRefresh(refresh);
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
          <Collapse in={open}>
            <Filters
              onExpireChange={handleExpireChange}
              onPremiumChange={handlePremiumChange}
              onTimeChange={handleTimeChange}
              onTickersChange={handleTickersChange}
              onContractChange={handleContractChange}
            />
          </Collapse>
        </Stack>
      </Toolbar>
    </Paper>
  );
};

TableToolbar.propTypes = {
  onExpireChange: PropTypes.func.isRequired,
  onPremiumChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onTickersChange: PropTypes.func.isRequired,
  onContractChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
