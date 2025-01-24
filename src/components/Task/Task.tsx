import { useState } from 'react';

import { ITask } from '@/types/boardTypes';
import { Menu, TaskMenu, TaskModal, WarningModal } from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';

interface Props {
  task: ITask;
  columnId: string;
}

const Task: React.FC<Props> = ({ task, columnId }) => {
  const { deleteTask } = boardSlice.actions;
  const { setIsEditing } = uiSlice.actions;
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleDeleting = () => {
    setDeleteModal(prev => !prev);
  };

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    toggleModal();
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({ taskId: task.id, columnId: columnId, taskTitle: task.title })
    );
  };

  return (
    <li className='flex flex-col gap-1 p-2 bg-slate-900 rounded-xl h-[120px]'>
      <div className='flex justify-between'>
        <h3 className='text-xl text-sky-400 line-clamp-1'>{task.title}</h3>
        <Menu closeDep={[modal, deleteModal]}>
          <TaskMenu
            showTask={toggleModal}
            editTask={handleEdit}
            deleteTask={toggleDeleting}
          />
        </Menu>
      </div>
      <p className='line-clamp-3 break-words'>{task.content}</p>
      <TaskModal
        isOpen={modal}
        onClose={toggleModal}
        title={task.title}
        content={task.content}
        taskId={task.id}
        columnId={columnId}
      />
      <WarningModal
        isOpen={deleteModal}
        onClose={toggleDeleting}
        itemName={task.title}
        handleDelete={handleDelete}
      />
    </li>
  );
};

export default Task;
