import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createBoardAPI,
  CreateBoardRequest,
  getBoardByIdAPI,
  getAllBoardsAPI,
  deleteBoardAPI,
  updateBoardByIdAPI,
  UpdateBoardRequest,
} from '../../api';
import axios from 'axios';
import { notification } from 'antd';
import { RootState } from '../../app/store';
import i18next from 'i18next';

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
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  board: {
    _id: '',
    title: '',
    owner: '',
    users: [],
  },
  statusGetBoardById: 'idle',
  status: 'idle',
};

export const getAllBoards = createAsyncThunk('boards/getBoards', async (userId: string) => {
  try {
    const response = await getAllBoardsAPI(userId);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: i18next.t('Request failed message') + err.response?.status,
        description: err.response?.data.message,
      });
      throw new Error(err.message);
    }
  }
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (request: CreateBoardRequest) => {
    try {
      const users = request.users ? request.users : [''];
      const { title } = request;
      const response = await createBoardAPI({ title, users });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error({
          message: i18next.t('Request failed message') + err.response?.status,
          description: err.response?.data.message,
        });
        throw new Error(err.message);
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
        message: i18next.t('Request failed message') + err.response?.status,
        description: err.response?.data.message,
      });
      throw new Error(err.message);
    }
  }
});
export const updateBoardById = createAsyncThunk(
  'boards/updateBoardById',
  async (request: UpdateBoardRequest) => {
    try {
      const response = await updateBoardByIdAPI(request);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error({
          message: i18next.t('Request failed message') + err.response?.status,
          description: err.response?.data.message,
        });
        throw new Error(err.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (boardId: string) => {
  try {
    const response = await deleteBoardAPI(boardId);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: i18next.t('Request failed message') + err.response?.status,
        description: err.response?.data.message,
      });
      throw new Error(err.message);
    }
  }
});

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    resetCurrentBoard: (state) => {
      state.status = 'idle';
      state.currentBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBoardById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBoardById.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateBoardById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(getAllBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload;
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
        state.statusGetBoardById = 'loading';
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.statusGetBoardById = 'idle';
        state.currentBoard = action.payload;
        state.board = action.payload;
      })
      .addCase(getBoardById.rejected, (state) => {
        state.statusGetBoardById = 'failed';
      });
  },
});

export const selectBoard = (state: RootState) => state.boards.currentBoard;
export const selectBoardStatus = (state: RootState) => state.boards.status;

export default boardsSlice.reducer;
