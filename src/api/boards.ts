import axios from 'axios';
import { baseApiUrl } from '.';

export interface CreateBoardRequest {
  title: string;
  owner: string;
  users: string[];
}

export const getAllBoardsAPI = async () => await axios.get(baseApiUrl + '/boards');

export const createBoardAPI = async (request: CreateBoardRequest) => {
  return await axios.post(baseApiUrl + '/boards', request);
};
export const getBoardByIdAPI = async (boardId: string) => {
  return await axios.get(baseApiUrl + `/boards/${boardId}`);
};
export const deleteBoardAPI = async (boardId: string) => {
  return await axios.delete(baseApiUrl + `/boards/${boardId}`);
};
