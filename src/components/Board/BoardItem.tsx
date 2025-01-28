import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  BoardMenu,
  BoardWrapper,
  EditBoardItem,
  Menu,
  WarningModal,
} from '@/components';
import { IBoard } from '@/types/boardTypes';
import { boardSlice } from '@/store/reducers/boardReducer';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface Props {
  board: IBoard;
}

const BoardItem: React.FC<Props> = ({ board }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { deleteBoard, setCurrentBoardId } = boardSlice.actions;
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate(board.id);
  };

  const toggleDeliting = () => {
    setDeleteModal(prev => !prev);
  };

  const handleDelete = () => {
    dispatch(deleteBoard({ boardId: board.id, boardTitle: board.title }));
  };

  const handleEdit = () => {
    dispatch(setCurrentBoardId(board.id));
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <EditBoardItem
        isEditing={isEditing}
        onClose={() => setIsEditing(false)}
        title={board.title}
        description={board.description}
      />
    );
  }

  return (
    <BoardWrapper className='transition duration-300 hover:border-2 hover:border-sky-400'>
      <div
        className='h-full flex flex-col gap-2 select-none'
        onClick={handleNavigate}
      >
        <div className='flex justify-between gap-2 relative'>
          <h3 className='text-3xl font-bold text-sky-400 overflow-hidden text-ellipsis h-10'>
            {board.title}
          </h3>
          <Menu closeDep={deleteModal} id={board.id}>
            <BoardMenu
              goToBoard={handleNavigate}
              handleDelete={toggleDeliting}
              handleEdit={handleEdit}
            />
          </Menu>
        </div>
        <div className='line-clamp-4 break-words'>{board.description}</div>
      </div>
      <WarningModal
        onClose={toggleDeliting}
        isOpen={deleteModal}
        handleDelete={handleDelete}
        itemName={board.title}
      ></WarningModal>
    </BoardWrapper>
  );
};

export default BoardItem;
