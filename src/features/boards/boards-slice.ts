import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createBoardAPI,
  CreateBoardRequest,
  getBoardByIdAPI,
  getAllBoardsAPI,
  deleteBoardAPI,
} from '../../api';
import axios from 'axios';
import { notification } from 'antd';

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  status: 'idle',
};

export const getAllBoards = createAsyncThunk('boards/getBoards', async () => {
  try {
    const response = await getAllBoardsAPI();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: 'Request failed with code ' + err.response?.status,
        description: err.response?.data.message,
      });
    }
  }
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (request: CreateBoardRequest) => {
    try {
      const response = await createBoardAPI(request);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error({
          message: 'Request failed with code ' + err.response?.status,
          description: err.response?.data.message,
        });
      }
    }
  }
);

export const getBoardById = createAsyncThunk('boards/getBoardById', async (boardId: string) => {
  try {
    const response = await getBoardByIdAPI(boardId);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: 'Request failed with code ' + err.response?.status,
        description: err.response?.data.message,
      });
    }
  }
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (boardId: string) => {
  try {
    const response = await deleteBoardAPI(boardId);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: 'Request failed with code ' + err.response?.status,
        description: err.response?.data.message,
      });
    }
  }
});

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(getAllBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = [...action.payload, initialState.boards];
      })
      .addCase(getAllBoards.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createBoard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getBoardById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentBoard = action.payload;
      })
      .addCase(getBoardById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default boardsSlice.reducer;
