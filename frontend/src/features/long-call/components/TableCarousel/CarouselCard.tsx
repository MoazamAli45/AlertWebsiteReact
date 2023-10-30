import { Box, Stack, styled, Typography } from '@mui/material';

const CardStyled = styled(Box)(({ theme }) => ({
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 0',
  '& .MuiTypography-root': {
    fontWeight: 600,
  },
  '& .MuiTypography-h6': {
    fontWeight: 500,
    fontSize: '0.85rem',
  },
  '& .MuiStack-root': {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTypography-root': {
      marginLeft: theme.spacing(1),
    },
  },
}));

interface Props {
  name: string;
  icon: React.ReactElement;
  amount: string;
}

export const CarouselCard = ({ name, icon, amount }: Props) => {
  return (
    <CardStyled>
      <Typography variant="h6">{name}</Typography>
      <Stack>
        <>{icon}</>
        <Typography>{amount}</Typography>
      </Stack>
    </CardStyled>
  );
};
