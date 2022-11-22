import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskListReducer from '../features/task-list/task-list-slice';
import columnsReducer from '../features/columns/columns-slice';
import authReducer from '../features/auth/auth-slice';
import boardsReducer from '../features/boards/boards-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskList: taskListReducer,
    columns: columnsReducer,
    boards: boardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
