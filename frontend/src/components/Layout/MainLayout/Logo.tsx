import { Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  collapsed: boolean;
};

export const Logo = ({ collapsed }: Props) => {
  return (
    <MuiLink
      component={Link}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      to="/"
      underline="none"
    >
      <img src="/logo.png" alt="logo" height={50} />
      <Typography
        sx={{
          textTransform: 'uppercase',
          color: '#98bfeb',
          fontWeight: 500,
          fontSize: '1.175rem',
          marginLeft: -0.25,
          userSelect: 'none',
          display: collapsed ? 'block' : 'none',
          // opacity: collapsed ? 1 : 0,
          // transition: 'all 0.3s ease',
        }}
      >
        {/* Alert Algo */}
      </Typography>
    </MuiLink>
  );
};
