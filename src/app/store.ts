import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskListReducer from "../features/task-list/task-list-slice";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/auth-slice";
import columnsReducer from "../features/columns/columns-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    taskList: taskListReducer,
    columns: columnsReducer,
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
