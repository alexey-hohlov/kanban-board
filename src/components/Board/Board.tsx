import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { IBoard, IColumn, ITask } from '@/types/boardTypes';
import {
  Column,
  AddColumn,
  Button,
  EditBoard,
  Task,
  SortableColumn,
} from '@/components';
import { AddFavoreteIcon, EditIcon, RemoveFavoriteIcon } from '@/assets';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { isInArray } from '@/utils/isInArray';
import { MouseSensor, KeyboardSensor } from '@/utils/sensors';

interface Props {
  board: IBoard;
}

const Board: React.FC<Props> = ({ board }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const { favoriteBoards } = useAppSelector(state => state.boardReducer);
  const { moveColumn, moveTask, toggleFavoriteBoard } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  const toggleFavorite = () => {
    dispatch(toggleFavoriteBoard(board.id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { data } = event.active;
    if (data.current?.type === 'column') {
      setActiveColumn(data.current?.column);
    }
    if (data.current?.type === 'task') {
      setActiveTask(data.current?.task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    if (active.data.current?.type !== 'column') return;

    dispatch(moveColumn({ activeId: active.id, overId: over.id }));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over?.id) return;
    if (active.data.current?.type !== 'task') return;

    dispatch(
      moveTask({
        activeId: active.id,
        overId: over.id,
        sourceColumnId: active.data.current?.columnId,
        targetColumnId: over.data.current?.columnId
          ? over.data.current?.columnId
          : over.id,
      })
    );
  };

  return (
    <section className='flex flex-col h-full'>
      <div className='flex items-center justify-between px-2'>
        <h3 className='font-bold text-2xl text-sky-400 line-clamp-1'>
          {board.title}
        </h3>
        <div className='flex'>
          {isInArray(favoriteBoards, board.id) ? (
            <Button onClick={toggleFavorite}>
              <RemoveFavoriteIcon className='fill-yellow-300' />
            </Button>
          ) : (
            <Button onClick={toggleFavorite}>
              <AddFavoreteIcon className='opacity-70 hover:fill-yellow-300 hover:opacity-100' />
            </Button>
          )}

          <Button onClick={toggleEditing}>
            <EditIcon className='opacity-70' />
          </Button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <ul className='flex py-2 gap-4 h-full w-full overflow-x-auto'>
          <SortableContext
            items={board.columns}
            strategy={horizontalListSortingStrategy}
          >
            {board.columns.map(col => (
              <SortableColumn key={col.id} columnId={col.id} column={col}>
                <Column column={col} />
              </SortableColumn>
            ))}
          </SortableContext>
          <AddColumn />
        </ul>
        <DragOverlay>
          {activeColumn && <Column column={activeColumn} />}
          {activeTask && <Task task={activeTask} columnId='' />}
        </DragOverlay>
      </DndContext>
      <EditBoard
        isOpen={isEditing}
        title={board.title}
        description={board.description}
        onClose={toggleEditing}
      />
    </section>
  );
};

export default Board;
