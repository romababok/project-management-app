import axios from 'axios';
import { baseApiUrl } from '.';
import { TaskItem } from '../Interfaces';

export interface TaskRequest {
  title: string;
  order: number;
  description: string;
  columnId?: string;
  userId: number;
  users: string[];
}

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface TaskSetRequest {
  _id: string;
  order: number;
  columnId: string;
}

export const getAllTasks = async (boardId: string, columnId: string) =>
  await axios.get<Task[]>(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks`);

export const createTask = async (boardId: string, columnId: string, request: TaskRequest) =>
  await axios.post<Task>(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks`, request);

export const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  request: TaskRequest
) =>
  await axios.put<Task>(
    baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    request
  );

export const deleteTask = async (boardId: string, columnId: string, taskId: string) =>
  await axios.delete<Task>(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);

export const getTask = async (boardId: string, columnId: string, taskId: string) =>
  await axios.get<Task>(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);

export const updateTaskSet = async (request: TaskSetRequest[]) =>
  await axios.patch<Task[]>(baseApiUrl + '/tasksSet', request);

export const getUserTasks = async (userId: string) =>
  await axios.get<TaskItem[]>(baseApiUrl + `/tasksSet?userId=${userId}`);
