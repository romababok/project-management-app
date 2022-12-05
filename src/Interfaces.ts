import { Task } from './api/tasks';
import { Column } from './api/сolumns';

enum StatusesEnum {
  'idle',
  'loading',
  'succeeded',
  'failed',
}
export interface TaskItem {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: [];
}

type Statuses = keyof typeof StatusesEnum;

export interface InitialState {
  status: Statuses;
  error: string | null;
}

export interface InitialStateColumns extends InitialState {
  columns: Column[];
}

export interface InitialStateTasks extends InitialState {
  taskList: Task[];
}

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  board: Board;
  status: 'idle' | 'loading' | 'failed';
  statusGetBoardById: 'idle' | 'loading' | 'failed';
  statusDeleteBoard: 'idle' | 'loading' | 'failed';
  statusUpdateBoard: 'idle' | 'loading' | 'failed';
  statusCreateBoard: 'idle' | 'loading' | 'failed';
}
