import { useState } from 'react';

import { ITask } from '@/types/boardTypes';
import {
  EditTask,
  Menu,
  Modal,
  ShowTask,
  TaskMenu,
  WarningModal,
} from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  task: ITask;
  columnId: string;
}

const Task: React.FC<Props> = ({ task, columnId }) => {
  const { deleteTask } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [showTask, setShowTask] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleShow = () => {
    setShowTask(prev => !prev);
  };

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  const toggleDeleting = () => {
    setDeleteModal(prev => !prev);
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
        <Menu id={task.id} closeDep={[showTask, isEditing, deleteModal]}>
          <TaskMenu
            showTask={toggleShow}
            editTask={toggleEditing}
            deleteTask={toggleDeleting}
          />
        </Menu>
      </div>
      <p className='line-clamp-3 break-words'>{task.content}</p>
      <Modal isOpen={showTask} onClose={toggleShow}>
        <ShowTask
          title={task.title}
          content={task.content}
          taskId={task.id}
          columnId={columnId}
          onClose={toggleShow}
        />
      </Modal>
      <Modal isOpen={isEditing} onClose={toggleEditing}>
        <EditTask
          title={task.title}
          content={task.content}
          taskId={task.id}
          columnId={columnId}
          onClose={toggleEditing}
        />
      </Modal>
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
