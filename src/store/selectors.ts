import { IBoards } from '@/types/boardTypes';
import { UniqueIdentifier } from '@dnd-kit/core';

export const selectColumnIndex = (
  state: IBoards,
  columnId: string | UniqueIdentifier
) => {
  return state.boards[state.currentBoardId].columns.findIndex(
    col => col.id === columnId
  );
};

export const selectTaskIndex = (
  state: IBoards,
  columnId: string | UniqueIdentifier,
  taskId: string | UniqueIdentifier
) => {
  const column = state.boards[state.currentBoardId].columns.find(
    col => col.id === columnId
  );

  return column ? column.tasks.findIndex(task => task.id === taskId) : -1;
};

export const selectBoardIndex = (state: IBoards, boardId: string) => {
  return state.boardIds.findIndex(id => id === boardId);
};

export const selectPinnedBoardIndex = (state: IBoards, boardID: string) => {
  return state.pinnedBoards.findIndex(id => id === boardID);
};
