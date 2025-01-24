import { EditTask, Modal, ShowTask } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  taskId: string;
  columnId: string;
}

const TaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  content,
  taskId,
  columnId,
}) => {
  const { isTaskEditing } = useAppSelector(state => state.uiReducer);
  const { setIsEditing } = uiSlice.actions;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();
    dispatch(setIsEditing(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className='bg-slate-950 shadow-xl rounded-xl p-4  w-96'>
        {isTaskEditing ? (
          <EditTask
            title={title}
            content={content}
            taskId={taskId}
            columnId={columnId}
            onClose={handleClose}
          />
        ) : (
          <ShowTask title={title} content={content} />
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
