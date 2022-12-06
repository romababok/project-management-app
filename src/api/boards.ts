import axios from 'axios';
import { baseApiUrl } from '.';

export interface CreateBoardRequest {
  title: string;
  users: string[];
}
export interface UpdateBoardRequest extends CreateBoardRequest {
  boardId: string;
  owner: string;
}

export const getAllBoardsAPI = async (userId: string) =>
  await axios.get(baseApiUrl + `/boardsSet/${userId}`);

export const createBoardAPI = async (request: CreateBoardRequest) => {
  const owner = localStorage.getItem('userId') as string;
  return await axios.post(baseApiUrl + '/boards', { ...request, owner });
};
export const updateBoardByIdAPI = async ({ boardId, owner, title, users }: UpdateBoardRequest) => {
  return await axios.put(baseApiUrl + `/boards/${boardId}`, { title, owner, users });
};
export const getBoardByIdAPI = async (boardId: string) => {
  return await axios.get(baseApiUrl + `/boards/${boardId}`);
};
export const deleteBoardAPI = async (boardId: string) => {
  return await axios.delete(baseApiUrl + `/boards/${boardId}`);
};
