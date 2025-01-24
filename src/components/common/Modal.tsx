import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [content, setContent] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div data-no-dnd>
      <CSSTransition
        in={isOpen}
        classNames={'modal-overlay'}
        timeout={300}
        nodeRef={overlayRef}
        unmountOnExit
        onEnter={() => setContent(true)}
        onExit={() => setContent(false)}
      >
        <div
          ref={overlayRef}
          onMouseDown={onClose}
          className='fixed top-0 left-0 w-screen h-screen bg-slate-700/30 backdrop-blur flex justify-center items-center select-none cursor-pointer z-20'
        >
          <CSSTransition
            in={content}
            classNames={'modal-content'}
            timeout={300}
            nodeRef={contentRef}
            unmountOnExit
          >
            <div
              className='cursor-default'
              ref={contentRef}
              onMouseDown={e => e.stopPropagation()}
            >
              {children}
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Modal;
