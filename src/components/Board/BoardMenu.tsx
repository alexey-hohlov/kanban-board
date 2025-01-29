import { DeleteIcon, EditIcon, GoToIcon } from '@/assets';
import { Button } from '@/components';

interface Props {
  goToBoard: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const BoardMenu: React.FC<Props> = ({
  goToBoard,
  handleEdit,
  handleDelete,
}) => {
  return (
    <ul>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={goToBoard}
        >
          go to board
          <GoToIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={handleEdit}
        >
          edit board
          <EditIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={handleDelete}
        >
          delete board
          <DeleteIcon className='size-4' />
        </Button>
      </li>
    </ul>
  );
};

export default BoardMenu;
