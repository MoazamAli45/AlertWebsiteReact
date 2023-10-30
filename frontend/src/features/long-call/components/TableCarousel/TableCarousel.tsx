import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CoinArrow,
  UpArrow,
  DownArrow,
  Dice,
  RightIcon,
  TriangleIcon,
  CircleIcon,
  VegaIcon,
  RhoIcons,
  GammaIcon,
} from '@/assets/icons';
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CarouselCard } from './CarouselCard';

const SliderStyled = styled(Box)(({ theme }) => ({
  marginTop: 24,
  marginLeft: 20,
  marginRight: 20,
  '& .slick-arrow:before': {
    content: '""',
  },
  '& .MuiIconButton-root': {
    background: theme.palette.background.paper,
    height: 40,
    width: 40,
    zIndex: 1,
    '& .MuiSvgIcon-root': {
      width: 20,
      color: theme.palette.primary.main,
    },
  },
}));

interface Props {
  strikeData: any;
}

type ArrowProps = {
  [x: string]: any;
  currentSlide?: number;
  slideCount?: number;
};

const SlickArrowLeft = ({
  currentSlide: _,
  slideCount: __,
  ...props
}: ArrowProps) => (
  <IconButton {...props}>
    <ArrowBackIosNewIcon />
  </IconButton>
);

const SlickArrowRight = ({
  currentSlide: _,
  slideCount: __,
  ...props
}: ArrowProps) => (
  <IconButton {...props}>
    <ArrowForwardIosIcon />
  </IconButton>
);

export const TableCarousel = (props: Props) => {
  const value = props.strikeData;
  const netDebit = value?.last === 0 ? value?.mark * 100 : value?.last * 100;
  const breakEven = value?.strikePrice;
  const delta = value?.delta;
  const theta = value?.theta;
  const gamma = value?.gamma;
  const vega = value?.vega;
  const rho = value?.rho;

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const isDesktop = useMediaQuery(breakpoints.up('lg'));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isDesktop ? 4 : isMobile ? 2 : 3,
    slidesToScroll: isDesktop ? 4 : isMobile ? 2 : 3,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  return (
    <SliderStyled>
      <Slider {...settings}>
        <CarouselCard
          name="NET DEBIT"
          amount={netDebit ? `$${netDebit?.toFixed()}` : `$${0}`}
          icon={<CoinArrow />}
        />
        <CarouselCard
          name="MAX LOSS"
          amount={netDebit ? `$${netDebit?.toFixed()}` : `$${0}`}
          icon={<DownArrow />}
        />
        <CarouselCard name="MAX PROFIT" amount="Infinite" icon={<UpArrow />} />
        <CarouselCard name="CHANCE OF PROFIT" amount="--%" icon={<Dice />} />
        <CarouselCard
          name="BREAKEVEN"
          amount={`Above $${(value?.last + breakEven).toFixed(2)}`}
          icon={<RightIcon />}
        />
        <CarouselCard name="DELTA" amount={delta} icon={<TriangleIcon />} />
        <CarouselCard name="THETA" amount={theta} icon={<CircleIcon />} />
        <CarouselCard name="GAMMA" amount={gamma} icon={<GammaIcon />} />
        <CarouselCard name="VEGA" amount={vega} icon={<VegaIcon />} />
        <CarouselCard name="RHO" amount={rho} icon={<RhoIcons />} />
      </Slider>
    </SliderStyled>
  );
};
