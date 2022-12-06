import axios from 'axios';
import { baseApiUrl } from '.';

export interface Decoded {
  id: string;
  login: string;
  iat: number;
  exp: number;
}
export interface User {
  name: string;
  login: string;
  password: string;
}
export type UserInfo = {
  _id: string;
  name: string;
  login: string;
};

export const getUserByIdAPI = async (id: string) => {
  return await axios.get(baseApiUrl + `/users/${id}`);
};
export const getAllUsersAPI = async () => {
  return await axios.get(baseApiUrl + `/users`);
};
export const updateUserDataAPI = async (id: string, userData: User) => {
  return await axios.put(baseApiUrl + `/users/${id}`, userData);
};

export const deleteUserById = async (userId: string) =>
  await axios.delete(baseApiUrl + `/users/${userId}`);
