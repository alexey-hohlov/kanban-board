import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IColumn } from '@/types/boardTypes';

interface Props {
  children: ReactNode;
  columnId: string;
  column: IColumn;
}

const SortableColumn: React.FC<Props> = ({ children, columnId, column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: columnId, data: { type: 'column', column } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='h-full border-2 border-sky-400 bg-slate-950 shadow-xl rounded-xl flex-none w-[360px] opacity-60'
      ></div>
    );
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableColumn;
