import axios from "axios";
import { baseApiUrl } from ".";

export type TaskRequest = {
  title: string,
  order: number,
  description: string,
  userId: number,
  users: string[]
}

export type Task = {
  _id: string,
  title: string,
  order: number,
  boardId: string,
  columnId: string,
  description: string,
  userId: number,
  users: string[]
}

export const getAllTasks = async (boardId: string, columnId: string): Promise<Task[]> =>
  await axios.get(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks`);

export const createTask = async (boardId: string, columnId: string, request: TaskRequest): Promise<Task>  =>
  await axios.post(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks`, request);  

export const updateTask = async (boardId: string, columnId: string, taskId: string, request: TaskRequest): Promise<Task> =>
  await axios.put(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, request);

export const deleteTask = async (boardId: string, columnId: string, taskId: string): Promise<Task> =>
  await axios.delete(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);  

export const getTask = async (boardId: string, columnId: string, taskId: string): Promise<Task> =>
  await axios.get(baseApiUrl + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`); 
  