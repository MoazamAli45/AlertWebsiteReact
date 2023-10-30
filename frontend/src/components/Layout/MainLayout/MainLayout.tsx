import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem, {
  ListItemProps as MuiListItemProps,
} from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import CallIcon from '@mui/icons-material/Call';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link, useLocation } from 'react-router-dom';
import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap, Tooltip } from '@mui/material';
import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Logo } from '@/components/Layout/MainLayout/Logo';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import useAppBarHeight from '@/hooks/useAppBarHeight';

const drawerWidth = 258;
const collapsedDrawerWidth = 80;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${collapsedDrawerWidth}px !important`,
  [theme.breakpoints.up('sm')]: {
    width: `${collapsedDrawerWidth}px !important`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  [theme.breakpoints.up('sm')]: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      marginLeft: collapsedDrawerWidth,
      width: `calc(100% - ${collapsedDrawerWidth}px)`,
    }),
  },
}));

interface DesktopDrawerProps extends MuiDrawerProps {
  open: boolean;
}

const DesktopDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DesktopDrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  children?: React.ReactNode;
}

type SideNavigationItem = {
  title: string;
  to: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, never>, 'svg'>> & {
    muiName: string;
  };
};

const DrawerSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '16px 10px 4px;',
}));

interface ListItemProps extends MuiListItemProps {
  active?: boolean;
}

const ListItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemProps>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.background.default : 'inherit',
  borderRadius: '8px',
  '& .MuiListItemButton-root': {
    padding: '12px',
    '& .MuiListItemText-root': {
      color: theme.palette.text.primary,
      margin: 0,
      padding: '0 16px',
      '& .MuiTypography-root': {
        fontSize: '13px',
      },
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.text.secondary,
      minWidth: 'unset',
    },
  },
}));

export function MainLayout({ children }: Props) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsible, setCollapsible] = React.useState(true);
  const [desktopOpen, setDesktopOpen] = React.useState(false);

  const handleDesktopDrawerOpen = () => {
    setDesktopOpen(true);
  };

  const handleDesktopDrawerClose = () => {
    collapsible && setDesktopOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sideNavigation: SideNavigationItem[] = [
    {
      title: 'Dashboard',
      to: '/dashboard',
      icon: TuneIcon,
    },
    {
      title: 'Options Calculator',
      to: '/long-call',
      icon: CallIcon,
    },
    {
      title: 'Options Flow',
      to: '/option-flow',
      icon: CurrencyExchangeIcon,
    },
    {
      title: 'News',
      to: '/news',
      icon: NewspaperIcon,
    },
  ];

  const drawer = (
    <div>
      <Box
        sx={{
          my: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 2,
          marginRight: 1,
        }}
      >
        <Logo collapsed={mobileOpen || desktopOpen} />
        <Tooltip title="Toggle sidebar">
          <IconButton
            onClick={() => setCollapsible((collapsible) => !collapsible)}
            sx={{
              backgroundColor: collapsible
                ? 'transparent'
                : 'background.default',
              visibility: {
                xs: 'hidden',
                sm: desktopOpen ? 'visible' : 'hidden',
              },
              borderRadius: 2,
            }}
            size="small"
          >
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ mx: 2 }}>
        <DrawerSectionTitle variant="h6">pages</DrawerSectionTitle>
        <List>
          {sideNavigation.map((item) => (
            <MuiLink
              component={Link}
              to={item.to}
              key={item.to}
              underline="none"
            >
              <ListItemStyled
                active={item.to === location.pathname}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      display: mobileOpen || desktopOpen ? 'block' : 'none',
                    }}
                  />
                </ListItemButton>
              </ListItemStyled>
            </MuiLink>
          ))}
        </List>
      </Box>
    </div>
  );

  const appBarHeight = useAppBarHeight();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={desktopOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h5" noWrap component="div">
            Dashboard
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }} aria-label="pages">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        <DesktopDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open={desktopOpen}
          onMouseEnter={handleDesktopDrawerOpen}
          onMouseLeave={handleDesktopDrawerClose}
        >
          {drawer}
        </DesktopDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, lg: 3 },
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          height: `calc(100vh - ${appBarHeight}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
