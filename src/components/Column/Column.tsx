import { useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { IColumn } from '@/types/boardTypes';
import {
  Task,
  ColumnWrapper,
  Menu,
  ColumnMenu,
  EditColumn,
  AddTask,
  SortableTask,
  WarningModal,
} from '@/components';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { boardSlice } from '@/store/reducers/boardReducer';

interface Props {
  column: IColumn;
}

const Column: React.FC<Props> = ({ column }) => {
  const { deleteColumn } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleDeliting = () => {
    setDeleteModal(prev => !prev);
  };

  const toggleAdding = () => {
    setIsAdding(prev => !prev);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnId: column.id, columnTitle: column.title }));
  };

  if (isEditing) {
    return (
      <EditColumn
        onClose={() => setIsEditing(false)}
        isEditing={isEditing}
        title={column.title}
        columnId={column.id}
      />
    );
  }

  return (
    <ColumnWrapper>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex items-center justify-between px-2'>
          <h3 className='line-clamp-1 text-xl font-bold text-sky-400'>
            {column.title}
          </h3>
          <Menu closeDep={[isAdding, deleteModal]}>
            <ColumnMenu
              newTask={toggleAdding}
              editColumn={handleEdit}
              deleteColumn={toggleDeliting}
            />
          </Menu>
        </div>
        <ul className='h-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden px-2'>
          <SortableContext
            items={column.tasks}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map(task => (
              <SortableTask
                key={task.id}
                taskId={task.id}
                columnId={column.id}
                task={task}
              >
                <Task task={task} columnId={column.id} />
              </SortableTask>
            ))}
          </SortableContext>
        </ul>
      </div>
      <AddTask isOpen={isAdding} onClose={toggleAdding} columnId={column.id} />
      <WarningModal
        isOpen={deleteModal}
        onClose={toggleDeliting}
        itemName={column.title}
        handleDelete={handleDelete}
      />
    </ColumnWrapper>
  );
};

export default Column;
