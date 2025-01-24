import { ReactNode } from 'react';

interface Props {
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button rounded-lg px-2 py-1 min-w-max select-none ${className}`}
      disabled={disabled}
    >
      {children}
      {title}
    </button>
  );
};

export default Button;
