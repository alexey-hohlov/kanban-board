import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { IBoard, IBoards, IColumn, ITask } from '@/types/boardTypes';
import {
  selectBoardIndex,
  selectColumnIndex,
  selectPinnedBoardIndex,
  selectTaskIndex,
} from '../selectors';

const initialState: IBoards = {
  boards: {},
  boardIds: [],
  pinnedBoards: [],
  currentBoardId: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IBoards>) {
      return { ...state, ...action.payload };
    },
    setCurrentBoardId(state, action: PayloadAction<string>) {
      state.currentBoardId = action.payload;
    },
    addBoard(state, action: PayloadAction<IBoard>) {
      state.boards[action.payload.id] = action.payload;
      state.boardIds.push(action.payload.id);
    },
    deleteBoard(
      state,
      action: PayloadAction<{ boardId: string; boardTitle: string }>
    ) {
      const { boardId } = action.payload;
      const boards = { ...state.boards };
      const boardIndex = selectBoardIndex(state, boardId);
      const pinIndex = selectPinnedBoardIndex(state, boardId);

      if (pinIndex !== -1) {
        state.pinnedBoards.splice(pinIndex, 1);
      }

      delete boards[boardId];
      state.boards = boards;
      state.boardIds.splice(boardIndex, 1);
    },
    togglePinBoard(state, action: PayloadAction<string>) {
      const boardIndex = state.pinnedBoards.findIndex(
        id => id === action.payload
      );
      switch (boardIndex) {
        case -1:
          state.pinnedBoards.push(action.payload);
          break;
        default:
          state.pinnedBoards.splice(boardIndex, 1);
          break;
      }
    },
    addColumn(state, action: PayloadAction<IColumn>) {
      const { boards, currentBoardId } = state;
      boards[currentBoardId].columns.push(action.payload);
    },
    addTask(state, action: PayloadAction<{ columnId: string; task: ITask }>) {
      const { boards, currentBoardId } = state;
      const { columnId, task } = action.payload;
      const columnIndex = selectColumnIndex(state, columnId);
      if (columnIndex !== -1) {
        boards[currentBoardId].columns[columnIndex].tasks.push(task);
      }
    },
    editBoard(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
      }>
    ) {
      const { boards, currentBoardId } = state;
      const { title, description } = action.payload;
      boards[currentBoardId].title = title;
      boards[currentBoardId].description = description;
    },
    editColumn(
      state,
      action: PayloadAction<{ columnId: string; title: string }>
    ) {
      const { boards, currentBoardId } = state;
      const { columnId, title } = action.payload;
      const columnIndex = selectColumnIndex(state, columnId);
      if (columnIndex !== -1) {
        boards[currentBoardId].columns[columnIndex].title = title;
      }
    },
    editTask(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
        task: { title: string; content: string };
      }>
    ) {
      const { boards, currentBoardId } = state;
      const { columnId, taskId, task } = action.payload;
      const columnIndex = selectColumnIndex(state, columnId);
      const taskIndex = selectTaskIndex(state, columnId, taskId);
      if (columnIndex !== -1 && taskIndex !== -1) {
        boards[currentBoardId].columns[columnIndex].tasks[taskIndex].title =
          task.title;
        boards[currentBoardId].columns[columnIndex].tasks[taskIndex].content =
          task.content;
      }
    },
    deleteColumn(
      state,
      action: PayloadAction<{ columnId: string; columnTitle: string }>
    ) {
      const { columnId } = action.payload;
      const { boards, currentBoardId } = state;
      const columnIndex = selectColumnIndex(state, columnId);
      if (columnIndex !== -1) {
        boards[currentBoardId].columns.splice(columnIndex, 1);
      }
    },
    deleteTask(
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
        taskTitle: string;
      }>
    ) {
      const { boards, currentBoardId } = state;
      const { columnId, taskId } = action.payload;
      const columnIndex = selectColumnIndex(state, columnId);
      const taskIndex = selectTaskIndex(state, columnId, taskId);
      if (columnIndex !== -1 && taskIndex !== -1) {
        boards[currentBoardId].columns[columnIndex].tasks.splice(taskIndex, 1);
      }
    },
    moveColumn(
      state,
      action: PayloadAction<{
        activeId: UniqueIdentifier;
        overId: UniqueIdentifier;
      }>
    ) {
      const { activeId, overId } = action.payload;
      const { boards, currentBoardId } = state;

      const columns = [...boards[currentBoardId].columns];
      const oldIndex = selectColumnIndex(state, activeId!);
      const newIndex = selectColumnIndex(state, overId!);

      if (newIndex !== -1 && oldIndex !== -1) {
        boards[currentBoardId].columns = arrayMove(columns, oldIndex, newIndex);
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        activeId: UniqueIdentifier;
        overId: UniqueIdentifier;
        sourceColumnId: UniqueIdentifier;
        targetColumnId: UniqueIdentifier;
      }>
    ) {
      const { activeId, overId, sourceColumnId, targetColumnId } =
        action.payload;
      const { boards, currentBoardId } = state;

      const sourceColumnIndex = selectColumnIndex(state, sourceColumnId);
      const targetColumnIndex = selectColumnIndex(state, targetColumnId);
      const oldIndex = selectTaskIndex(state, sourceColumnId, activeId);
      const task =
        boards[currentBoardId].columns[sourceColumnIndex].tasks[oldIndex];

      if (
        sourceColumnIndex === -1 ||
        targetColumnIndex === -1 ||
        oldIndex === -1
      )
        return;

      if (sourceColumnId === targetColumnId) {
        const newIndex = selectTaskIndex(state, sourceColumnId, overId);
        const tasks = [
          ...boards[currentBoardId].columns[sourceColumnIndex].tasks,
        ];
        if (newIndex !== -1)
          boards[currentBoardId].columns[sourceColumnIndex].tasks = arrayMove(
            tasks,
            oldIndex,
            newIndex
          );
      }

      if (sourceColumnId !== targetColumnId) {
        boards[currentBoardId].columns[sourceColumnIndex].tasks.splice(
          oldIndex,
          1
        );

        switch (targetColumnId === overId) {
          case true:
            boards[currentBoardId].columns[targetColumnIndex].tasks.push(task);
            break;
          case false:
            const newIndex = selectTaskIndex(state, targetColumnId, overId);
            boards[currentBoardId].columns[targetColumnIndex].tasks.splice(
              newIndex,
              0,
              task
            );
            break;
          default:
            break;
        }
      }
    },
  },
});

export const { addBoard } = boardSlice.actions;
export default boardSlice.reducer;
