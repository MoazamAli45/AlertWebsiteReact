import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
  Skeleton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/system';
import { DateTime } from 'luxon';

type Props = {
  item: {
    uuid: string;
    title: string;
    url: string;
    image_url: string;
    snippet: string;
    description: string;
    source: string;
    published_at: string;
  };
};

export const Card = ({ item }: Props) => {
  const [imageLoading, setImageLoading] = useState(
    item.image_url ? true : false,
  );

  return (
    <MuiLink
      component={Link}
      to={`${item.url}`}
      underline="none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardStyled>
        {imageLoading ? (
          <Skeleton sx={{ height: 200 }} variant="rectangular" animation="wave">
            <CardMedia
              component="img"
              image={item.image_url}
              title={item.title}
              onLoad={() => setImageLoading(false)}
            />
          </Skeleton>
        ) : (
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={
              item.image_url ||
              'https://placehold.co/300x200?text=IMAGE+NOT+AVAILABLE'
            }
            title={item.title}
          />
        )}
        <CardContentStyled>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {item.snippet || item.description}
          </Typography>
          <Typography gutterBottom variant="body2" color="primary.light">
            {item.source}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              position: 'absolute',
              right: 16,
              bottom: 8,
            }}
          >
            {DateTime.fromISO(item.published_at).toRelative()}
          </Typography>
        </CardContentStyled>
        <OpenInNewTabStyled>
          <OpenInNewIcon />
        </OpenInNewTabStyled>
      </CardStyled>
    </MuiLink>
  );
};

const CardStyled = styled(MuiCard)(({ theme }) => ({
  ':hover': {
    transform: 'scale(1.03)',
    transition: 'transform 0.3s',
    '& .MuiCardContent-root > div:first-of-type': {
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    },
    '& > .MuiBox-root': {
      display: 'flex',
    },
  },
  height: '100%',
  position: 'relative',
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  '& > .MuiTypography-root': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    LineClamp: 4,
  },
  '& > div:first-of-type': {
    fontSize: '1.125rem',
    WebkitLineClamp: 2,
    LineClamp: 2,
  },
  paddingBottom: theme.spacing(3),
}));

const OpenInNewTabStyled = styled(Box)(() => ({
  borderRadius: '50%',
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'none',
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  width: 28,
  height: 28,
  '& .MuiSvgIcon-root': {
    fontSize: '1.125rem',
  },
}));
