import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { MenuIcon } from '@/assets';

interface IProps {
  children: ReactNode;
  closeDep?: boolean | boolean[];
}

const Menu: React.FC<IProps> = ({ children, closeDep }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;
    setIsOpen(false);
  }, [closeDep]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (
        !nodeRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div
      data-no-dnd
      className='relative'
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <button className='button' ref={buttonRef} onClick={handleClick}>
        <MenuIcon />
      </button>
      <CSSTransition
        in={isOpen}
        classNames={'menu'}
        timeout={200}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div
          className='fixed bg-slate-900/30 backdrop-blur p-2 rounded-xl shadow-xl border-2 border-sky-600 z-10'
          ref={nodeRef}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Menu;
