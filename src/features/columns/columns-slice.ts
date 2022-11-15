import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Column, ColumnsRequest, createColumn, deleteColumn, getAllColumns, updateColumn } from "../../api/updateColumns";
import { RootState } from "../../app/store";

type ThunkArgsType = {
  boardId: string;
  request: ColumnsRequest
};

export const columnsCreate = createAsyncThunk(
  "columns/create",
  async ({ boardId, request }: ThunkArgsType) => {
    try {
      const response = await createColumn(boardId, request);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const columnsDelete = createAsyncThunk(
  "columns/delete",
  async ({ boardId, columnId }: {boardId: string, columnId: string}) => {
    try {
      const response = await deleteColumn(boardId, columnId);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const columnsUpdate = createAsyncThunk(
  "columns/update",
  async ({ boardId, columnId, request }: {boardId: string, columnId: string, request: ColumnsRequest}) => {
    try {
      const response = await updateColumn(boardId, columnId, request);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const columnsGetAll = createAsyncThunk(
  "columns/getAll",
  async (boardId: string) => {
    try {
      const response = await getAllColumns(boardId);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

type InitialStateType = {
  columns: Column[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialStateType = {
  columns: [],
  status: "idle",
  error: null,
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(columnsCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.columns = [...state.columns, action.payload];
        }
      })
      .addCase(columnsCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(columnsCreate.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(columnsDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          const updatedColumns = state.columns.filter(column => column._id !== action.payload?._id);
          state.columns = updatedColumns;
        }
      })
      .addCase(columnsDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(columnsDelete.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(columnsUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          let updatedColumns = state.columns
          .filter(column => column._id === action.payload?._id)
          .map(column => column = action.payload ?? column);
          state.columns = updatedColumns;
        }
      })
      .addCase(columnsUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(columnsUpdate.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(columnsGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.columns = action.payload;
        }
      })
      .addCase(columnsGetAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(columnsGetAll.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectColumns = (state: RootState) => state.columns.columns;

export default columnsSlice.reducer;