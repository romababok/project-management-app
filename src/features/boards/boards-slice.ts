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
import { BoardsState } from '../../types/Interfaces';

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
  statusUpdateBoard: 'idle',
  statusDeleteBoard: 'idle',
  statusCreateBoard: 'idle',
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
        state.statusUpdateBoard = 'loading';
      })
      .addCase(updateBoardById.fulfilled, (state, action) => {
        state.statusUpdateBoard = 'idle';
        if (action.payload) {
          const newList = state.boards.map((el) => {
            if (el._id === action.payload._id) {
              return {
                _id: el._id,
                title: action.payload.title,
                owner: el.owner,
                users: el.users,
              };
            }
            return el;
          });
          state.boards = newList;
        }
      })
      .addCase(updateBoardById.rejected, (state) => {
        state.statusUpdateBoard = 'failed';
      })
      .addCase(deleteBoard.pending, (state) => {
        state.statusDeleteBoard = 'loading';
      })
      .addCase(deleteBoard.rejected, (state) => {
        state.statusDeleteBoard = 'failed';
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.statusDeleteBoard = 'idle';
        if (action.payload) {
          const newBoards = state.boards.filter((board) => board._id !== action.payload?._id);
          state.boards = newBoards;
        }
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
        state.statusCreateBoard = 'loading';
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.statusCreateBoard = 'idle';
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state) => {
        state.statusCreateBoard = 'failed';
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
