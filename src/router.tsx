import { createHashRouter } from 'react-router-dom';

import { BoardPage, NotFoundPage, SelectPage } from '@/pages';
import { ROUTES } from '@/constants';
import { Layout } from './components';

export const router = createHashRouter([
  {
    path: ROUTES.HOME.PATH,
    element: <Layout />,
    children: [
      {
        element: <SelectPage />,
        index: true,
      },
      { path: ROUTES.BOARD.PATH, element: <BoardPage /> },
      { path: ROUTES.NOT_FOUND.PATH, element: <NotFoundPage /> },
    ],
  },
]);
