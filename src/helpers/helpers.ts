import { AuthState } from '../features/auth/auth-slice';

export const setError = (state: AuthState) => {
  state.status = 'failed';
};
