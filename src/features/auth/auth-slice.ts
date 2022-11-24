import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signIn, signUp, SignUpRequest } from '../../api';
<<<<<<< Updated upstream
import { getUserByIdAPI } from '../../api/users';
import { notification } from 'antd';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
=======
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { getUserByIdAPI } from '../../api/users';
import { notification } from 'antd';
>>>>>>> Stashed changes

export interface AuthState {
  userData: {
    _id: string;
    name: string;
    login: string;
    token: string | null;
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  userData: {
<<<<<<< Updated upstream
    id: '',
=======
    _id: '',
>>>>>>> Stashed changes
    name: '',
    login: '',
    token: '',
  },
  status: 'idle',
};
export type JwtData = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

export const getUserData = createAsyncThunk('auth/getUser', async (jwt: string) => {
  const { id } = jwt_decode<JwtData>(jwt);
  try {
    const response = await getUserByIdAPI(id);
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

interface JwtData {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const getUserData = createAsyncThunk('auth/getUser', async (jwt: string) => {
  const { id } = jwt_decode<JwtData>(jwt);
  try {
    const response = await getUserByIdAPI(id);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: 'Data on the page is out of date.',
        description: err.response?.data.message,
      });
    }
  }
});

export const authSignUp = createAsyncThunk('auth/signUp', async (request: SignUpRequest) => {
  const response = await signUp(request);
  return response.data;
});

export const authSignIn = createAsyncThunk('auth/signIn', async (request: SignUpRequest) => {
  try {
    const response = await signIn(request);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notification.error({
        message: 'User was not founded! Check your input.' + err.response?.status,
        description: err.response?.data.message,
      });
    }
  }
});

const setError = (state: AuthState) => {
  state.status = 'failed';
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
<<<<<<< Updated upstream
      localStorage.removeItem('token');
      state.userData = {
        id: '',
=======
      state.userData = {
        _id: '',
>>>>>>> Stashed changes
        name: '',
        login: '',
        token: '',
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(authSignUp.rejected, setError)

      .addCase(authSignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.status = 'idle';
<<<<<<< Updated upstream
        const data = action.payload;
        if (data) {
          localStorage.setItem('token', action.payload.token);
          const decoded: JwtData = jwt_decode(action.payload.token);
          state.userData.id = decoded.id;
          state.userData.login = decoded.login;
        }
      })
      .addCase(authSignIn.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData.id = action.payload._id;
        state.userData.name = action.payload.name;
        state.userData.login = action.payload.login;
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
        localStorage.removeItem('token');
        state.userData.id = '';
      });
=======
        localStorage.setItem('token', action.payload.token);
        const decoded: JwtData = jwt_decode(action.payload.token);
        state.userData.login = decoded.login;
        state.userData._id = decoded.id;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData = action.payload;
      })
      .addCase(authSignIn.rejected, setError)
      .addCase(authSignUp.rejected, setError);
>>>>>>> Stashed changes
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const bearerKey = (state: RootState) => state.auth.userData?.token;
export const selectUser = (state: RootState) => state.auth.userData;

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
