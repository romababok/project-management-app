import axios from "axios";
import { baseApiUrl } from ".";

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

export const getAllColumns = async (boardId: string): Promise<Column[]> =>
  await axios.get(baseApiUrl + `/boards/${boardId}/columns`);

export const createColumn = async (boardId: string, request: ColumnsRequest): Promise<Column> =>
  await axios.post(baseApiUrl + `/boards/${boardId}/columns`, request);

export const updateColumn = async (boardId: string, columnId: string, request: ColumnsRequest): Promise<Column> =>
  await axios.put(baseApiUrl + `/boards/${boardId}/columns/${columnId}`, request);

export const deleteColumn = async (boardId: string, columnId: string): Promise<Column> =>
  await axios.delete(baseApiUrl + `/boards/${boardId}/columns/${columnId}`); 
  
  
 