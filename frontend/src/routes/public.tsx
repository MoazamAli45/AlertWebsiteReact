import HomePage from '@/features/pages/HomePage';
import Login from '@/features/pages/Login';
import Signup from '@/features/pages/Signup';

export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
];
