import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const BoardWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <li
      className={`shadow-xl border-2 border-transparent bg-slate-950 p-4 rounded-xl gap-2 h-44 ${className}`}
    >
      {children}
    </li>
  );
};

export default BoardWrapper;
