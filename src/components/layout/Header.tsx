import { Link } from 'react-router-dom';

import { BurgerIcon } from '@/assets';
import { BackButton, Button, Logo } from '@/components';
import { ROUTES } from '@/constants';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';

const Header: React.FC = () => {
  const { setSidebar } = uiSlice.actions;
  const dispatch = useAppDispatch();

  const handleSidebar = () => {
    dispatch(setSidebar(true));
  };

  return (
    <header className='flex justify-between px-6 items-center bg-black/20'>
      <Link to={ROUTES.HOME.PATH}>
        <Logo />
      </Link>
      <div className='flex gap-2'>
        <BackButton />
        <Button onClick={handleSidebar}>
          <BurgerIcon className='hover:fill-sky-400' />
        </Button>
      </div>
    </header>
  );
};

export default Header;
