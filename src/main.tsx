import { createRoot } from 'react-dom/client';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import '@/styles/index.scss';

import { router } from './router';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
