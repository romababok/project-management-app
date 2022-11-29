import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signIn, signUp, SignUpRequest } from '../../api';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { deleteUserById, getUserByIdAPI, updateUserDataAPI, User } from '../../api/users';
import { notification } from 'antd';

export interface AuthState {
  userData: {
    id: string;
    name: string;
    login: string;
    token: string | null;
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  userData: {
    id: '',
    name: '',
    login: '',
    token: '',
  },
  status: 'idle',
};
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, request }: { userId: string; request: User }) => {
    try {
      const response = await updateUserDataAPI(userId, request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: 'Request failed with code ' + error.response?.status,
          description:
            error.response?.status === 409 ? 'This login already exist' : 'Something went wrong',
        });
        throw new Error(error.message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId: string) => {
  try {
    const response = await deleteUserById(userId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notification.error({
        message: 'Request failed with code ' + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
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
      localStorage.removeItem('token');
      state.userData = {
        id: '',
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
        const data = action.payload;
        if (data) {
          localStorage.setItem('token', action.payload.token);
          const decoded: JwtData = jwt_decode(action.payload.token);
          state.userData.login = decoded.login;
          state.userData.id = decoded.id;
        }
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData.id = action.payload._id;
        state.userData.login = action.payload.login;
        state.userData.name = action.payload.name;
      })
      .addCase(authSignIn.rejected, setError)
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData.id = action.payload._id;
        state.userData.login = action.payload.login;
        state.userData.name = action.payload.name;
        notification.success({
          message: 'All changes successfully saved!',
        });
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
        notification.error({
          message: 'Bad request!',
        });
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.userData.id = '';
        state.userData.login = '';
        state.userData.name = '';
        state.userData.token = null;
        localStorage.removeItem('token');
        state.status = 'idle';
        notification.success({
          message: 'Your account has been deleted',
          description:
            'We are very sorry that you left our application...We will be glad see you again!',
        });
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const bearerKey = (state: RootState) => state.auth.userData?.token;
export const selectUser = (state: RootState) => state.auth.userData;

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
