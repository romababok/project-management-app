import axios from 'axios';
import { store } from '../app/store';

export * from './signInUp';
export * from './boards';

export const baseApiUrl = 'https://final-task-backend-production-e57b.up.railway.app';

axios.interceptors.request.use(function (config) {
  const token = store.getState().auth.userData?.token;
  config.headers!.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
