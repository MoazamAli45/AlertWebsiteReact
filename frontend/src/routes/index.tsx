import { useRoutes } from 'react-router-dom';

import { NotFound } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useEffect, useState } from 'react';
export const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User') || 'null');
    // console.log(user);
    if (user) {
      setIsAuth(true);
    }
  }, []);

  // const auth = useAuth();
  // TODO: Replace with real auth
  const auth = { user: isAuth };

  // console.log(isAuth);
  const routes = auth.user ? protectedRoutes : publicRoutes;

  const commonRoutes = [{ path: '/*', element: <NotFound /> }];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
