import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';

import { ROUTES } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { uiSlice } from '@/store/reducers/uiReducer';
import { GitHubIcon } from '@/assets';

const Sidebar: React.FC = () => {
  const { pinnedBoards, boards } = useAppSelector(state => state.boardReducer);
  const { setSidebar } = uiSlice.actions;
  const { sidebar } = useAppSelector(state => state.uiReducer);
  const dispatch = useAppDispatch();

  const [content, setContent] = useState<boolean>(false);

  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const handleClose = () => {
    dispatch(setSidebar(false));
  };

  useEffect(() => {
    document.body.style.overflow = sidebar ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebar]);

  return (
    <CSSTransition
      in={sidebar}
      classNames={'sidebar-overlay'}
      timeout={300}
      nodeRef={overlayRef}
      unmountOnExit
      onEnter={() => setContent(true)}
      onExit={() => setContent(false)}
    >
      <div
        ref={overlayRef}
        className='fixed top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur flex justify-end select-none cursor-pointer'
        onClick={handleClose}
      >
        <CSSTransition
          in={content}
          classNames={'sidebar-content'}
          timeout={300}
          nodeRef={contentRef}
          unmountOnExit
        >
          <div
            ref={contentRef}
            className='bg-slate-900 cursor-auto w-72 sm:w-80 md:w-96 sidebar-content'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex flex-col items-center p-4 gap-4 h-full overflow-y-auto'>
              <h3 className='text-3xl font-black text-sky-400 italic'>Menu</h3>
              <ul className='flex flex-col gap-3'>
                <Link
                  to={ROUTES.HOME.PATH}
                  onClick={() => {
                    dispatch(setSidebar(false));
                  }}
                  className='text-2xl hover:text-sky-400 transition-colors'
                >
                  Your boards
                </Link>
              </ul>

              <ul className='flex flex-col gap-2 items-center mt-2'>
                <h3 className='text-xl font-black text-sky-400 italic'>
                  Pinned Boards
                </h3>
                {pinnedBoards.map(id => (
                  <Link
                    key={id}
                    to={id}
                    onClick={() => {
                      dispatch(setSidebar(false));
                    }}
                  >
                    <li className='text-center line-clamp-1 hover:text-sky-400 transition-colors'>
                      {boards[id].title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <footer className='bg-black/20 flex justify-center p-2'>
              <div className='flex items-center gap-3 text-xs sm:text-xs md:text-sm lg:text-base'>
                Built by
                <a
                  className='flex items-center gap-2'
                  href='https://github.com/alexey-hohlov'
                  target='_blank'
                >
                  <GitHubIcon className='size-6 md:size-8' />
                  <span className='text-sky-400'>alexey-hohlov</span>
                </a>
              </div>
            </footer>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default Sidebar;
