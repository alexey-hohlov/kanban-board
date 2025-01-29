import { DeleteIcon, EditIcon, GoToIcon } from '@/assets';
import { Button } from '@/components';

interface Props {
  showTask: () => void;
  editTask: () => void;
  deleteTask: () => void;
}

const TaskMenu: React.FC<Props> = ({ showTask, editTask, deleteTask }) => {
  return (
    <ul>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={showTask}
        >
          show task
          <GoToIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={editTask}
        >
          edit task
          <EditIcon className='size-4' />
        </Button>
      </li>
      <li>
        <Button
          className='menu-item__hover flex items-center gap-1'
          onClick={deleteTask}
        >
          delete task
          <DeleteIcon className='size-4' />
        </Button>
      </li>
    </ul>
  );
};

export default TaskMenu;
