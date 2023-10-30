import { Suspense } from 'react';
import { lazyImport } from '@/utils/lazyImport';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { CircularProgress } from '@mui/material';
import HomePage from '@/features/pages/HomePage';
import Login from '@/features/pages/Login';
import Signup from '@/features/pages/Signup';
import { useLocation } from 'react-router-dom';

const { Dashboard } = lazyImport(
  () => import('@/features/dashboard'),
  'Dashboard',
);
const { LongCall } = lazyImport(
  () => import('@/features/long-call'),
  'LongCall',
);
const { OptionFlow } = lazyImport(
  () => import('@/features/option-flow'),
  'OptionFlow',
);
const { News } = lazyImport(() => import('@/features/news'), 'News');

const App = () => {
  const location = useLocation();

  return (
    <>
      {/*  Condition for   main layout */}
      {location.pathname === '/' ||
      location.pathname === '/signup' ||
      location.pathname === '/login' ? (
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      ) : (
        <MainLayout>
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      )}
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/dashboard', element: <Dashboard /> },
      {
        path: '/long-call',
        element: <LongCall />,
      },
      {
        path: '/option-flow',
        element: <OptionFlow />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];
