import axios, { AxiosResponse} from "axios";
import { baseApiUrl } from "./index";

export type ColumnsRequest = {
  title: string,
  order: number,
}

export type Column = {
  _id: string,
  title: string,
  order: number,
  boardId: string
}

export const getAllColumns = async (boardId: string) =>
  await axios.get<Column[]>(baseApiUrl + `/boards/${boardId}/columns`);

export const createColumn = async (boardId: string, request: ColumnsRequest) =>
  await axios.post<Column>(baseApiUrl + `/boards/${boardId}/columns`, request);

export const updateColumn = async (boardId: string, columnId: string, request: ColumnsRequest) =>
  await axios.put<Column>(baseApiUrl + `/boards/${boardId}/columns/${columnId}`, request);

export const deleteColumn = async (boardId: string, columnId: string) =>
  await axios.delete<Column>(baseApiUrl + `/boards/${boardId}/columns/${columnId}`); 
  
  
 