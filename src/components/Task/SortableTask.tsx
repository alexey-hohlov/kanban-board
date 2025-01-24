import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ITask } from '@/types/boardTypes';

interface Props {
  children: ReactNode;
  taskId: string;
  columnId: string;
  task: ITask;
}

const SortableTask: React.FC<Props> = ({
  children,
  taskId,
  columnId,
  task,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: { type: 'task', columnId: columnId, task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='min-h-[120px] border-2 border-sky-400 bg-slate-950 shadow-xl rounded-xl opacity-60'
      ></div>
    );
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableTask;
