import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, getAllTasks, Task, TaskRequest, updateTask } from "../../api/updateTasks";
import { RootState } from "../../app/store";


type InitialStateType = {
  taskList: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialStateType = {
  taskList: [],
  status: "idle",
  error: null,
};

export const tasksCreate = createAsyncThunk(
  "tasks/create",
  async ({ boardId, columnId, request }: {boardId: string, columnId: string, request: TaskRequest}) => {
    try {
      const response = await createTask(boardId, columnId, request);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const tasksDelete = createAsyncThunk(
  "tasks/delete",
  async ({ boardId, columnId, taskId }: {boardId: string, columnId: string, taskId: string}) => {
    try {
      const response = await deleteTask(boardId, columnId, taskId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const tasksUpdate = createAsyncThunk(
  "tasks/update",
  async ({ boardId, columnId, taskId, request }: {boardId: string, columnId: string, taskId: string, request: TaskRequest}) => {
    try {
      const response = await updateTask(boardId, columnId, taskId, request);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const tasksGetAll = createAsyncThunk(
  "columns/getAll",
  async ({ boardId, columnId }: {boardId: string, columnId: string}) => {
    try {
      const response = await getAllTasks(boardId, columnId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(tasksCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.taskList = [...state.taskList, action.payload];
        }
      })
      .addCase(tasksCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(tasksCreate.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(tasksDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          const updatedTasks = state.taskList.filter(task => task._id !== action.payload?._id);
          state.taskList = updatedTasks;
        }
      })
      .addCase(tasksDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(tasksDelete.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(tasksUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          let updatedTasks = state.taskList
          .filter(task => task._id === action.payload?._id)
          .map(task => task = action.payload ?? task);
          state.taskList = updatedTasks;
        }
      })
      .addCase(tasksUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(tasksUpdate.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(tasksGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.taskList = action.payload;
        }
      })
      .addCase(tasksGetAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(tasksGetAll.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectTasks = (state: RootState) => state.taskList;

export default tasksSlice.reducer;