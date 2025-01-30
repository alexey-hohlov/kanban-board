import { useState } from 'react';

import { Button, EditTask } from '@/components';
import { EditIcon } from '@/assets';

interface Props {
  title: string;
  content: string;
  taskId: string;
  columnId: string;
  onClose: () => void;
}

const ShowTask: React.FC<Props> = ({
  title,
  content,
  taskId,
  columnId,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  const handleClose = () => {
    onClose();
  };

  return isEditing ? (
    <EditTask
      title={title}
      content={content}
      taskId={taskId}
      columnId={columnId}
      onClose={toggleEditing}
    />
  ) : (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h3 className='text-2xl text-sky-400 font-bold line-clamp-1'>
          {title}
        </h3>
        <Button onClick={toggleEditing}>
          <EditIcon className='opacity-80 hover:fill-sky-400' />
        </Button>
      </div>
      {content.length ? (
        <p className='bg-slate-900 p-2 rounded-xl min-h-40 max-h-96 overflow-y-auto break-words'>
          {content}
        </p>
      ) : (
        <span className='text-center font-bold text-2xl text-slate-700'>
          (empty)
        </span>
      )}
      <Button
        onClick={handleClose}
        title='Close'
        className='border-2 border-rose-500 text-rose-500'
      />
    </div>
  );
};

export default ShowTask;
