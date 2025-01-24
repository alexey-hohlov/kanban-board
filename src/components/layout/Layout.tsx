import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { Header, Sidebar } from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '@/constants';

const Layout: React.FC = () => {
  const { setData } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [storedData] = useLocalStorage(LOCAL_STORAGE_KEY);

  useEffect(() => {
    if (storedData) {
      dispatch(setData(storedData));
    }
  }, [dispatch]);

  return (
    <main className='layout bg-slate-900'>
      <Header />
      <div className='px-4 py-2 relative'>
        <Outlet />
      </div>
      <Sidebar />
    </main>
  );
};

export default Layout;
