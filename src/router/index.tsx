import { createBrowserRouter } from 'react-router-dom';
import { lazyPage } from './utils/lazy-page';
import Layout from '../pages/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        ...lazyPage(() => import('../pages/home')),
      },
      {
        path: 'exercise1',
        ...lazyPage(() => import('../pages/exercise-1')),
      },
      {
        path: 'exercise2',
        ...lazyPage(() => import('../pages/exercise-2')),
      },
      {
        path: '*',
        ...lazyPage(() => import('../pages/not-found')),
      },
    ],
  },
]);
