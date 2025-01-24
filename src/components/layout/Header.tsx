import { Link } from 'react-router-dom';

import { BurgerIcon } from '@/assets';
import { Button, Logo } from '@/components';
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
      <Button onClick={handleSidebar}>
        <BurgerIcon />
      </Button>
    </header>
  );
};

export default Header;
