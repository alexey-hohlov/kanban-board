import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { NotFoundPage } from '@/pages';
import { Board } from '@/components';
import { boardSlice } from '@/store/reducers/boardReducer';

const BoardPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { boards } = useAppSelector(state => state.boardReducer);
  const { setCurrentBoardId } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const board = boardId && boards[boardId];

  useEffect(() => {
    if (!boardId) return;
    dispatch(setCurrentBoardId(boardId));
  }, [boardId]);

  return board ? <Board board={boards[boardId]} /> : <NotFoundPage />;
};

export default BoardPage;
