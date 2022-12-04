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

interface InitialState {
  status: Statuses;
  error: string | null;
}

export interface InitialStateColumns extends InitialState {
  columns: Column[];
}

export interface InitialStateTasks extends InitialState {
  taskList: Task[];
}
