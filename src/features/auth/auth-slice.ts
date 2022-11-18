import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { signIn, signUp, SignUpRequest } from "../../api";

export interface AuthState {
  userData: {
    id: string;
    name: string;
    login: string;
    token: string | null;
  } | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  userData: null,
  status: "idle",
};

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async (request: SignUpRequest) => {
    const response = await signUp(request);
    return response.data;
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async (request: SignUpRequest) => {
    const response = await signIn(request);
    return response.data;
  }
);

const setError = (state: AuthState) => {
  state.status = "failed";
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(authSignUp.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(authSignIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(authSignIn.rejected, setError);
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const bearerKey = (state: RootState) => state.auth.userData?.token;
export const selectUser = (state: RootState) => state.auth.userData;

export default authSlice.reducer;
