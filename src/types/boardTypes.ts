export interface ITask {
  id: string;
  title: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns: IColumn[];
}

export interface IBoards {
  boards: {
    [key: string]: IBoard;
  };
  boardIds: string[];
  pinnedBoards: string[];
  currentBoardId: string;
}
