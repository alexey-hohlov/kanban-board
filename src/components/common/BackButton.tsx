import { useLocation, useNavigate } from 'react-router-dom';

import { BackIcon } from '@/assets';
import { Button } from '@/components';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/') return;
    navigate(-1);
  };

  return (
    <Button title='Back' className='flex items-center button__back' onClick={handleBack}>
      <BackIcon className='size-4' />
    </Button>
  );
};

export default BackButton;
