import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAllUsersAPI, getUserByIdAPI, signIn, signUp, SignUpRequest } from '../../api';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { deleteUserById, updateUserDataAPI } from '../../api/users';
import { notification } from 'antd';
import i18next from 'i18next';
import { setError } from '../../helpers/helpers';

interface User {
  _id: string;
  name: string;
  login: string;
}

export interface SignInUser {
  name: string;
  login: string;
  password: string;
}

export interface AuthState {
  users: User[];
  userData: User;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  users: [],
  userData: {
    _id: '',
    name: '',
    login: '',
  },
  status: 'idle',
};
interface JwtData {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const authSignUp = createAsyncThunk('auth/signUp', async (request: SignUpRequest) => {
  const response = await signUp(request);
  return response.data;
});

export const authSignIn = createAsyncThunk('auth/signIn', async (request: SignUpRequest) => {
  try {
    const response = await signIn(request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notification.error({
        message: i18next.t('User was not founded') + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const getUserData = createAsyncThunk('auth/getUser', async (jwt: string) => {
  const { id } = jwt_decode<JwtData>(jwt);
  try {
    const response = await getUserByIdAPI(id);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notification.error({
        message: i18next.t('Data on the page is out of date.'),
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async () => {
  try {
    const response = await getAllUsersAPI();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notification.error({
        message: i18next.t('User was not founded') + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, request }: { userId: string; request: SignInUser }) => {
    try {
      const response = await updateUserDataAPI(userId, request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: i18next.t('Request failed message') + error.response?.status,
          description:
            error.response?.status === 409
              ? i18next.t('This login already exist')
              : i18next.t('Something went wrong'),
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
        message: i18next.t('Request failed message') + error.response?.status,
        description: error.response?.data.message,
      });
      throw new Error(error.message);
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.userData = {
        _id: '',
        name: '',
        login: '',
      };
      state.users = [];
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
        localStorage.setItem('token', data.token);
        const decoded: JwtData = jwt_decode(data.token);
        state.userData._id = decoded.id;
        localStorage.setItem('userId', decoded.id);
        notification.info({
          message: i18next.t('Welcom') + ` '${decoded.login}'!`,
        });
      })
      .addCase(authSignIn.rejected, setError)
      .addCase(getAllUsers.pending, (state: { status: string }) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.rejected, setError)

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })

      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        const data = action.payload;
        state.userData._id = data._id;
        state.userData.login = data.login;
        state.userData.name = data.name;
        localStorage.setItem('userId', data._id);
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        state.userData._id = '';
        state.userData.login = '';
        state.userData.name = '';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData._id = action.payload._id;
        state.userData.login = action.payload.login;
        state.userData.name = action.payload.name;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.userData._id = '';
        state.userData.login = '';
        state.userData.name = '';
        localStorage.removeItem('token');
        state.status = 'idle';
        notification.success({
          message: i18next.t('Your account has been deleted'),
          description: i18next.t('Sorry message'),
        });
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'failed';
        state.userData.name = '';
      });
  },
});

export const selectUser = (state: RootState) => state.auth.userData;

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
