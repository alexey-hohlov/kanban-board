import { ReactNode, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { MenuIcon } from '@/assets';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';

interface IProps {
  children: ReactNode;
  closeDep?: boolean | boolean[];
  id: string;
}

const Menu: React.FC<IProps> = ({ children, closeDep, id }) => {
  const isOpen = useAppSelector(state => state.uiReducer.menu === id);
  const { toggleMenu } = uiSlice.actions;
  const dispatch = useAppDispatch();

  const nodeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    dispatch(toggleMenu(id));
  };

  useEffect(() => {
    if (!isOpen) return;
    dispatch(toggleMenu(id));
  }, [closeDep]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (
        !nodeRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        dispatch(toggleMenu(id));
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
        <MenuIcon className='size-7 hover:fill-sky-400' />
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
