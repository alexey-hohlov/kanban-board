import { DeleteIcon, EditIcon, NewCardIcon } from '@/assets';
import { Button } from '@/components';

interface Props {
  newTask: () => void;
  editColumn: () => void;
  deleteColumn: () => void;
}

const ColumnMenu: React.FC<Props> = ({ newTask, editColumn, deleteColumn }) => {
  return (
    <ul className='flex flex-col gap-2'>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={editColumn}
        >
          rename column
          <EditIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={newTask}
        >
          add task
          <NewCardIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={deleteColumn}
        >
          delete column
          <DeleteIcon className='size-4' />
        </Button>
      </li>
    </ul>
  );
};

export default ColumnMenu;
