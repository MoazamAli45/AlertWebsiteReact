import { useOnMouseDownScroll } from '@/features/long-call/hooks/useScroll';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';

interface StrikesProps {
  apiData: any;
  strikeItem: any;
  setStrikeData: any;
}

function Strikes({ strikeItem, setStrikeData }: StrikesProps) {
  const [activeItem, setActiveItem] = useState(0);

  const toNumber = Object.keys(strikeItem);
  const numberArray: number[] = [];

  for (let i = 0; i < toNumber.length; i++) {
    numberArray.push(Number(toNumber[i]));
  }
  const onClickStrike = (strikeValue: any, index: number) => {
    setActiveItem(index);
    const dataStrike = Object.entries(strikeItem);
    dataStrike.map((item: any) => {
      if (Number(item[0]) === strikeValue) {
        setStrikeData(item[1][0]);
      }
    });
  };

  useEffect(() => {
    const vIndex = numberArray.length > 0 && numberArray[0];
    onClickStrike(vIndex, 0);
    setActiveItem(0);
  }, [strikeItem]);

  const ref = useRef(null);
  const { onScrollLeft, onScrollRight, stopScrolling } = useOnMouseDownScroll({
    ref,
    step: 10,
  });

  return (
    <Stack mt={1} gap={2} sx={{ width: '100%' }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
        }}
      >
        Strike:
      </Typography>
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          m={1}
        >
          <Tooltip title="Press and hold to scroll" enterDelay={500}>
            <IconButton
              onMouseDown={onScrollLeft}
              onMouseUp={stopScrolling}
              onPointerDown={onScrollLeft}
              onPointerUp={stopScrolling}
              sx={{
                color: 'text.secondary',
                backgroundColor: 'background.default',
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Tooltip>
          <List
            sx={{
              display: 'flex',
              overflowX: 'hidden',
              gap: 1,
            }}
            ref={ref}
          >
            {numberArray
              .sort((a, b) => a - b)
              .map((item, index) => (
                <ListItem key={index} component="div" disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        activeItem === index
                          ? 'primary.main'
                          : 'background.default',
                      borderRadius: 2,
                      color:
                        activeItem !== index
                          ? 'text.secondary'
                          : 'text.primary',
                    }}
                    onClick={() => onClickStrike(item, index)}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Tooltip title="Press and hold to scroll" enterDelay={500}>
            <IconButton
              onMouseDown={onScrollRight}
              onMouseUp={stopScrolling}
              onPointerDown={onScrollRight}
              onPointerUp={stopScrolling}
              sx={{
                color: 'text.secondary',
                backgroundColor: 'background.default',
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Strikes;
