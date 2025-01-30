import { useState } from 'react';

import { Button, EditTask } from '@/components';

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
      <div className='flex justify-center gap-4'>
        <Button
          title='Edit'
          className='border-2 border-sky-500 text-sky-400 flex-1'
          onClick={toggleEditing}
        />
        <Button
          onClick={handleClose}
          title='Close'
          className='border-2 border-rose-500 flex-1 text-rose-500'
        />
      </div>
    </div>
  );
};

export default ShowTask;
