import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const ColumnWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <li
      className={`h-full w-[360px] p-2 bg-slate-950 shadow-xl rounded-xl flex-none ${className}`}
    >
      {children}
    </li>
  );
};

export default ColumnWrapper;
